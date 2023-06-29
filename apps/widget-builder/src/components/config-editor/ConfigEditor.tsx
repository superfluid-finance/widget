import { useRef, FC, useEffect, useMemo, useCallback, useState } from "react";
import MonacoEditor, {
  useMonaco,
  OnMount,
  OnChange,
  OnValidate,
} from "@monaco-editor/react";
import {
  paymentDetailsSchema,
  productDetailsSchema,
} from "@superfluid-finance/widget";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";
import { WidgetProps } from "../widget-preview/WidgetPreview";
import { AppBar, Stack, Toolbar, Typography, debounce } from "@mui/material";
import { UseFormSetValue } from "react-hook-form";

type StandaloneCodeEditor = Parameters<OnMount>[0];

type ConfigEditorProps = {
  value: WidgetProps;
  setValue: UseFormSetValue<WidgetProps>;
};

const schema = z.object({
  productDetails: productDetailsSchema,
  paymentDetails: paymentDetailsSchema,
  type: z.enum(["dialog", "drawer", "full-screen", "page"]),
});

const ConfigEditor: FC<ConfigEditorProps> = ({ value, setValue }) => {
  const editorRef = useRef<StandaloneCodeEditor>(null);
  const monaco = useMonaco();

  useEffect(() => {
    monaco?.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: true,
      schemaValidation: "error",
      schemas: [
        {
          uri: "https://superfluid.finance/widget",
          fileMatch: ["*"],
          schema: zodToJsonSchema(schema.describe("widgetConfig")),
        },
      ],
    });
  }, [monaco]);

  const handleEditorDidMount: OnMount = (editor, _monaco) => {
    editorRef.current = editor;
  };

  const initialValue = useMemo(
    () =>
      JSON.stringify(
        {
          ...value,
          displaySettings: undefined,
        },
        undefined,
        2
      ),
    [value]
  );
  const [editorValue, setEditorValue] = useState<string>(initialValue);
  const [isJsonValid, setIsJsonValid] = useState<boolean>(true);

  const handleEditorValidate: OnValidate = useCallback((markers) => {
    // If there are no errors in markers, the JSON is valid.
    setIsJsonValid(
      markers.every((marker) => marker.severity !== monaco.MarkerSeverity.Error)
    );
  }, []);

  const handleEditorChange: OnChange = useCallback((value) => {
    setEditorValue(value || "");
  }, []);

  const [saved, setSaved] = useState(false);
  const debouncedSideEffect = useCallback(
    debounce((isJsonValid: boolean, editorValue: string) => {
      if (isJsonValid) {
        try {
          const updatedValue = schema.parse(JSON.parse(editorValue));
          setValue("productDetails", updatedValue.productDetails);
          setValue("type", updatedValue.type);
          setValue("paymentDetails", updatedValue.paymentDetails);
          setSaved(true);
          setTimeout(() => {
            setSaved(false);
          }, 1000);
        } catch (e) {
          console.error(e, "Invalid JSON");
        }
      }
    }, 250),
    [setValue, setSaved]
  );

  useEffect(() => {
    debouncedSideEffect(isJsonValid, editorValue);
    return () => {
      debouncedSideEffect.clear();
    };
  }, [editorValue, isJsonValid, debouncedSideEffect]);

  return (
    <Stack height="100vh">
      <AppBar position="relative">
        <Stack
          component={Toolbar}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="h6" component="h2" color="white">
            JSON Editor
          </Typography>
          {saved && (
            <Typography variant="caption" color="white">
              Saved...
            </Typography>
          )}
        </Stack>
      </AppBar>
      <MonacoEditor
        defaultLanguage="json"
        theme="vs-light"
        onChange={handleEditorChange}
        value={editorValue}
        onValidate={handleEditorValidate}
        onMount={handleEditorDidMount}
        options={{
          automaticLayout: true,
          scrollBeyondLastLine: false,
          minimap: { enabled: false },
        }}
      />
    </Stack>
  );
};

export default ConfigEditor;

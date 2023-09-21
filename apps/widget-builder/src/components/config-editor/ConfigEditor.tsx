import MonacoEditor, {
  OnChange,
  OnMount,
  OnValidate,
  useMonaco,
} from "@monaco-editor/react";
import {
  Alert,
  AppBar,
  debounce,
  Snackbar,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  paymentDetailsSchema,
  productDetailsSchema,
} from "@superfluid-finance/widget";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { WidgetProps } from "../widget-preview/WidgetPreview";

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
  const editorRef = useRef<StandaloneCodeEditor | null>(null);
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
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
    }
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
        2,
      ),
    [value],
  );
  const [editorValue, setEditorValue] = useState<string>(initialValue);
  const [isJsonValid, setIsJsonValid] = useState<boolean>(true);

  const handleEditorValidate: OnValidate = useCallback((markers) => {
    // If there are no errors in markers, the JSON is valid.
    setIsJsonValid(
      markers.every(
        (marker) => marker.severity !== 8, // MarkerSeverity.Error
      ),
    );
  }, []);

  const handleEditorChange: OnChange = useCallback((value) => {
    setEditorValue(value ?? "");
  }, []);

  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const debouncedSideEffect = useCallback(
    debounce((isJsonValid: boolean, editorValue: string) => {
      setErrorMessage(null);
      if (isJsonValid) {
        try {
          const parseResult = schema.safeParse(JSON.parse(editorValue));
          if (parseResult.success) {
            setValue("productDetails", parseResult.data.productDetails);
            setValue("type", parseResult.data.type);
            setValue("paymentDetails", parseResult.data.paymentDetails);
            setSaved(true);
            setTimeout(() => {
              setSaved(false);
            }, 1000);
          } else {
            setErrorMessage(parseResult.error.message);
          }
        } catch (error) {
          setErrorMessage("Could not parse JSON");
        }
      }
    }, 250),
    [setValue, setSaved, setErrorMessage],
  );

  useEffect(() => {
    if (initialValue !== editorValue) {
      debouncedSideEffect(isJsonValid, editorValue);
    }
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
          <Typography
            data-testid="json-editor"
            variant="h6"
            component="h2"
            color="white"
          >
            JSON Editor
          </Typography>
          {saved && (
            <Typography variant="caption" color="white">
              Saved...
            </Typography>
          )}
        </Stack>
      </AppBar>
      {errorMessage && (
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={5000}
          ClickAwayListenerProps={{ mouseEvent: false }}
          onClose={() => setErrorMessage(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert variant="standard" severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
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

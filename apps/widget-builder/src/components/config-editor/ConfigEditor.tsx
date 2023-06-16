import { useRef, FC, useEffect, useMemo } from "react";
import MonacoEditor, { useMonaco, OnMount } from "@monaco-editor/react";
import {
  paymentDetailsSchema,
  productDetailsSchema,
} from "@superfluid-finance/widget";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";
import { WidgetProps } from "../widget-preview/WidgetPreview";
import { ThemeOptions } from "@mui/material";
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
  theme: z.any(),
});

const ConfigEditor: FC<ConfigEditorProps> = ({ value, setValue }) => {
  const editorRef = useRef<StandaloneCodeEditor>(null);
  const monaco = useMonaco();

  useEffect(() => {
    monaco?.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
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

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  function updateValue(value?: string) {
    if (!value) return;

    try {
      const updatedValue: Omit<WidgetProps, "displaySettings"> & {
        theme: ThemeOptions;
      } = JSON.parse(value);
      schema.parse(updatedValue);

      setValue("productDetails", updatedValue.productDetails);
      setValue("type", updatedValue.type);
      setValue("paymentDetails", updatedValue.paymentDetails);
    } catch (e) {
      console.error(e, "Invalid JSON");
    }
  }

  const valueWithoutTheme = useMemo(
    () => ({
      ...value,
      displaySettings: undefined,
    }),
    [value]
  );

  return (
    <MonacoEditor
      onChange={updateValue}
      height="100vh"
      defaultLanguage="json"
      value={JSON.stringify(valueWithoutTheme, null, 2)}
      onMount={handleEditorDidMount}
      options={{
        minimap: { enabled: false },
      }}
    />
  );
};

export default ConfigEditor;

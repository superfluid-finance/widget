import { useRef, FC, useEffect } from "react";
import MonacoEditor, {
  EditorProps,
  useMonaco,
  OnMount,
} from "@monaco-editor/react";
import { WidgetProps } from "../widget-preview/WidgetPreview";
import { UseFormSetValue } from "react-hook-form";
import {
  paymentDetailsSchema,
  productDetailsSchema,
} from "@superfluid-finance/widget";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";

type StandaloneCodeEditor = Parameters<OnMount>[0];

type ConfigEditorProps = {
  value: WidgetProps;
  setValue: UseFormSetValue<WidgetProps>;
};

const schema = z.object({
  productDetails: productDetailsSchema,
  paymentDetails: z.object({
    defaultReceiverAddress: z.string().startsWith("0x").length(42),
    ...paymentDetailsSchema.shape,
  }),
  layout: z.enum(["dialog", "drawer", "full-screen", "page"]),
  displaySettings: z.object({
    stepperOrientation: z.enum(["vertical", "horizontal"]),
    darkMode: z.boolean(),
    containerRadius: z.number().optional(),
    inputRadius: z.string().or(z.number()),
    buttonRadius: z.string().or(z.number()),
    font: z.object({
      family: z.string(),
      category: z.string(),
    }),
    primaryColor: z
      .string()
      .length(4)
      .or(z.string().length(7))
      .and(z.string().startsWith("#")),
    secondaryColor: z
      .string()
      .length(4)
      .or(z.string().length(7))
      .and(z.string().startsWith("#")),
  }),
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
      const updatedValue = JSON.parse(value) as WidgetProps;
      schema.parse(updatedValue);

      setValue("productDetails", updatedValue.productDetails);
      setValue("displaySettings", updatedValue.displaySettings);
      setValue("layout", updatedValue.layout);
      setValue("paymentDetails", updatedValue.paymentDetails);
    } catch (e) {
      console.error(e, "Invalid JSON");
    }
  }

  return (
    <MonacoEditor
      onChange={updateValue}
      height="100vh"
      defaultLanguage="json"
      value={JSON.stringify(value, null, 2)}
      onMount={handleEditorDidMount}
      options={{
        minimap: { enabled: false },
      }}
    />
  );
};

export default ConfigEditor;

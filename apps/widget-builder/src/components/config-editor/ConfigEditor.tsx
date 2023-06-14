import { useRef, FC, useEffect } from "react";
import { Editor, Monaco, useMonaco } from "@monaco-editor/react";
import { WidgetProps } from "../widget-preview/WidgetPreview";
import { UseFormSetValue } from "react-hook-form";
import {
  paymentDetailsSchema,
  productDetailsSchema,
} from "@superfluid-finance/widget";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";

type ConfigEditorProps = {
  value: WidgetProps;
  setValue: UseFormSetValue<WidgetProps>;
};

const schema = z.object({
  productDetails: productDetailsSchema,
  paymentDetails: z.object({
    defaultReceiverAddress: z.string().startsWith("0x"),
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
    primaryColor: z.string(),
    secondaryColor: z.string(),
  }),
});

const ConfigEditor: FC<ConfigEditorProps> = ({ value, setValue }) => {
  const editorRef = useRef(null);
  const monaco = useMonaco();

  useEffect(() => {
    monaco?.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: "https://superfluid.finance/widget",
          fileMatch: ["*"],
          schema: zodToJsonSchema(schema.describe("widgetConfig")),
        },
      ],
    });
  });

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor;
  }

  function updateValue(value?: string) {
    if (!value) return;

    try {
      const updatedValue = JSON.parse(value) as WidgetProps;
      setValue("productDetails", updatedValue.productDetails);
      setValue("displaySettings", updatedValue.displaySettings);
      setValue("layout", updatedValue.layout);
      setValue("paymentDetails", updatedValue.paymentDetails);
    } catch (e) {
      console.error(e, "Invalid JSON");
    }
  }

  return (
    <>
      <Editor
        onChange={updateValue}
        height="100vh"
        defaultLanguage="json"
        value={JSON.stringify(value, null, 2)}
        onMount={handleEditorDidMount}
      />
    </>
  );
};

export default ConfigEditor;
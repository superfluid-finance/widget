import { useRef, FC } from "react";
import { Editor, Monaco } from "@monaco-editor/react";
import { WidgetProps } from "../widget-preview/WidgetPreview";
import { UseFormSetValue } from "react-hook-form";

type CodeEditorProps = {
  value: WidgetProps;
  setValue: UseFormSetValue<WidgetProps>;
};

const CodeEditor: FC<CodeEditorProps> = ({ value, setValue }) => {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor;
  }

  function updateValue(value?: string) {
    if (!value) return;

    const updatedValue = JSON.parse(value) as WidgetProps;

    setValue("productDetails", updatedValue.productDetails);
    setValue("displaySettings", updatedValue.displaySettings);
    setValue("layout", updatedValue.layout);
    setValue("paymentDetails", updatedValue.paymentDetails);
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

export default CodeEditor;

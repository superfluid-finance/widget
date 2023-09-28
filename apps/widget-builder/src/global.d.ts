export {};

declare global {
  interface Window {
    Intercom: any;
    setEditorValue: (value: string) => void;
  }
}

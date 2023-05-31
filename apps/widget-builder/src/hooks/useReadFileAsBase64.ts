import { Dispatch, SetStateAction, useEffect, useState } from "react";

const readAsBase64 = (
  file: File,
  onSuccess: Dispatch<SetStateAction<string | null>>,
  onError: Dispatch<SetStateAction<ProgressEvent<EventTarget> | undefined>>
) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => onSuccess(reader.result as string);
  reader.onerror = onError;
};

const isFile = (target: File | string): target is File => {
  return target instanceof File;
};

export const useReadAsBase64 = (target?: File | string) => {
  const [base64, setBase64] = useState<string | null>(null);
  const [error, setError] = useState<ProgressEvent<EventTarget>>();

  useEffect(() => {
    const effect = async () => {
      if (!target) return;
      if (isFile(target)) {
        readAsBase64(target, setBase64, setError);
      } else {
        const blob = await (await fetch(target)).blob();
        const file = new File([blob], "image.png", { type: blob.type });

        readAsBase64(file, setBase64, setError);
      }
    };

    effect();
  }, [target]);

  return [base64, error];
};

import { FC, RefObject, useEffect } from "react";

const useOutsideClick = (ref: RefObject<any>, callback: () => void) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current) {
        const isOutsideClick = [...ref.current.children].every(
          (child) => !child.contains(event.target)
        );

        if (isOutsideClick) callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;

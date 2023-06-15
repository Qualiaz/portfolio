import { useEffect } from "react";

const useAutoSizeTextArea = (textAreaRef, value, setHeight) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = scrollHeight + "px";
      //   setHeight(scrollHeight);
    }
  }, [value, setHeight]);
};

export default useAutoSizeTextArea;

import { useLayoutEffect } from "react";

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = "NEWEE - Happy seller, easy selling";
    }
  }, [title]);
};

export default useDocumentTitle;

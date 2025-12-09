import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | InsightBoard`;
  }, [title]);
};

export default useTitle;

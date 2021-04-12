import { useEffect } from "react";
import { useVisible } from "../providers/VisibleProvider";
import fetchNui from "../utils/fetchNui";

export const useCloseListener = () => {
  const { visible, setVisible } = useVisible();

  useEffect(() => {
    const pressHandler = ({ key }): void => {
      if (!visible) return;
      if (key === "Escape") {
        setVisible(false);
        fetchNui("closeUI");
      }
    };

    window.addEventListener("keydown", pressHandler);

    return () => window.removeEventListener("keydown", pressHandler);
  }, [visible, setVisible]);
};

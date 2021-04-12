import { useEffect } from "react";
import { useVisible } from "../providers/VisibleProvider";

export const useCloseListener = () => {
  const { visible, setVisible } = useVisible();

  useEffect(() => {
    const pressHandler = ({ key }): void => {
      if (!visible) return;
      if (key === "Escape") {
        setVisible(false);
      }
    };

    window.addEventListener("keydown", pressHandler);

    return () => window.removeEventListener("keydown", pressHandler);
  }, [visible, setVisible]);
};

import React, { createContext, useContext, useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";

const VisibleContext = createContext(null);

interface IVisibleProvider {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const VisibleProvider: React.FC = ({ children }) => {
  const [visible, setVisible] = useState<boolean>(false);

  useNuiEvent("setVisible", setVisible);

  return (
    <VisibleContext.Provider
      value={{
        visible,
        setVisible,
      }}
    >
      {children}
    </VisibleContext.Provider>
  );
};

export const useVisible = () => useContext<IVisibleProvider>(VisibleContext);

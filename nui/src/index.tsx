import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import { VisibleProvider } from "./providers/VisibleProvider";

ReactDOM.render(
  <RecoilRoot>
    <VisibleProvider>
      <App />
    </VisibleProvider>
  </RecoilRoot>,
  document.getElementById("root")
);

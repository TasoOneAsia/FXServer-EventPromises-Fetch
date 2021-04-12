import React from "react";
import "./App.css";
import { DataListComp } from "./components/DataListComp";
import { createMuiTheme, ThemeProvider, Fade } from "@material-ui/core";
import InjectDebugData from "./utils/InjectDebugData";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import { useVisible } from "./providers/VisibleProvider";
import { useCloseListener } from "./hooks/useCloseListener";

const darkTheme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Inter"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    type: "dark",
    background: {
      default: "#151A1F",
      paper: "#1b2428",
    },
    primary: {
      main: "#ffc107",
      light: "#fff350",
      dark: "#c79100",
      contrastText: "#000000",
    },
    secondary: {
      main: "#212121",
      light: "#484848",
      dark: "#000000",
      contrastText: "#fff",
    },
  },
});

InjectDebugData([
  {
    method: "setVisible",
    data: true,
  },
]);

function App() {
  useCloseListener();
  const { visible } = useVisible();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <SnackbarProvider>
          <Fade in={visible} mountOnEnter unmountOnExit>
            <DataListComp />
          </Fade>
        </SnackbarProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;

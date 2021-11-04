import React from "react";
import { DialogProvider } from "react-dialog-async";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <DialogProvider>
      <App />
    </DialogProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

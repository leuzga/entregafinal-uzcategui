import * as React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import CardContext from "./Context/CardContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CardContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CardContext>
  </React.StrictMode>
);

reportWebVitals();

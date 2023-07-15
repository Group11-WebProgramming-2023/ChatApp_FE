import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import store from "./redux/store";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  </ReduxProvider>
);

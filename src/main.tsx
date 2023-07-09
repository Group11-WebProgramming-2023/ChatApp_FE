import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./pages/router";
import { AuthProvider } from "./contexts/AuthContext";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ReduxProvider>
  </React.StrictMode>
);

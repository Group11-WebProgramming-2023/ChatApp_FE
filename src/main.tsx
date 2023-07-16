import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Notifications as NotificationsProvider } from "@mantine/notifications";
import "./index.css";
import store from "./redux/store";
import Router from "./routes";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ReduxProvider store={store}>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        breakpoints: {
          xs: "30em",
          sm: "48em",
          md: "64em",
          lg: "74em",
          xl: "90em",
        },
      }}
    >
      <BrowserRouter>
        <AuthProvider>
          <NotificationsProvider />
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  </ReduxProvider>
);

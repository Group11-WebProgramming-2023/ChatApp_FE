import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { ROUTER } from "@/configs/routers";
import AuthLayout from "@/layouts/AuthLayout";
import BaseLayout from "@/layouts/BaseLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import { Home } from "./Home";
import { Login } from "./Login/Login";
import Page404 from "./Page404";
import { CallLog } from "./CallLog";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<BaseLayout />}>
      <Route element={<AuthLayout />}>
        <Route path={ROUTER.LOGIN} element={<Login />} />
      </Route>
      <Route path={ROUTER.BASE} element={<ProtectedLayout />}>
        <Route path={ROUTER.BASE} element={<Home />} />
        <Route path={ROUTER.CALL_LOG} element={<CallLog />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Route>
  )
);

export default router;

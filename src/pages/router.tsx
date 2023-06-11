import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import BaseLayout from "@/layouts/BaseLayout";
import Page404 from "./Page404";
import AuthLayout from "@/layouts/AuthLayout";
import { ROUTER } from "@/configs/routers";
import { Login } from "./Login/Login";
import ProtectedLayout from "@/layouts/ProtectedLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<BaseLayout />}>
      <Route element={<AuthLayout />}>
        <Route path={ROUTER.LOGIN} element={<Login />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route path="*" element={<Page404 />} />
      </Route>
    </Route>
  )
);

export default router;

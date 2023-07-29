import React, { Suspense } from "react";
import {
  createBrowserRouter,

  Link,

  Navigate,
  RouterProvider
} from "react-router-dom";
import PrivateRoutes from "./private-routes";
import ErrorPage from "./error-page";
import { Button } from "antd"

const Dashboard = React.lazy(() => import("../pages/dashboard/dashboard"));
const Products = React.lazy(() => import("../pages/products/list/products"));

export const PUBLIC_ROUTES = {
  LANDING_PAGE: "/",
  LOGIN: "/login",
  PASSWORD_RECOVERY: "/recovery",
  REGISTER: "register",
  NOT_FOUND: "404",
  INTERNAL_ERROR: "500",
  UNAUTHORIZED: "unauthorized",
  PAGE_IN_PROGRESS: "page-in-progress",
  SOCIAL_NETWORK_CALLBACK: "social-network-callback",
  TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
};

export const PRIVATE_ROUTES = {
  PRIVATE_BASE_ROUTE: "app",
  DASHBOARD: "dashboard",
  PRODUCTS: "products"
};
// const RedirectToPrivateRegister = () => <Navigate to="/private-register" />;

const ProtectedRoute = ({ isAuth, redirectPath = "/login", children }: any) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
const MainRoutes = () => {
  // const auth = useAppSelector((state) => state?.auth);
  const auth = { isLogged: true };
  // const token = localStorage.getItem("token");
  const token = "sd";

  const router = createBrowserRouter([
    {
      path: PUBLIC_ROUTES.LOGIN,
      element: <>Login</>,
    },
    {
      path: PUBLIC_ROUTES.LANDING_PAGE,
      errorElement: <ErrorPage />,
      element: <>
        <Link to={"/login"}>Login</Link>
        <Link to={"/app/products"}>Productos</Link>
        <Link to={"/app/dashboard"}>Dashboard</Link>
      </>
    },

    {
      path: PRIVATE_ROUTES.PRIVATE_BASE_ROUTE,
      element: (
        <Suspense fallback={<p>Cargando...</p>}>
          <ProtectedRoute isAuth={auth?.isLogged || token}>
            <PrivateRoutes />
          </ProtectedRoute>
        </Suspense>
      ),
      children: [
        {
          path: PRIVATE_ROUTES.DASHBOARD,
          element: <Dashboard />,
        },
        {
          path: PRIVATE_ROUTES.PRODUCTS,
          element: <Products />,
        },

      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default MainRoutes;

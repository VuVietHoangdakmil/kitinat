import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/layout/LayoutKatinat";
import LayoutAdmin from "./components/admin/layoutAdmin";
import Home from "./page/home";
import { ConfigProvider } from "antd";
import { routers, admin } from "./routes";
import Loading from "./components/loading/loadingBasic";
const About = lazy(() => import("./page/about"));
const Event = lazy(() => import("./page/event"));
const EventPage = lazy(() => import("./page/eventPage"));
const Product = lazy(() => import("./page/product"));
const ProductAdmin = lazy(() => import("./page/admin/Product"));
const ProductDetails = lazy(() => import("./page/product/[id]"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: routers.home,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: routers.product,
        element: (
          <Suspense fallback={<Loading />}>
            <Product />
          </Suspense>
        ),
      },
      {
        path: routers.product + "/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ProductDetails />
          </Suspense>
        ),
      },

      {
        path: routers.eventPage,
        element: (
          <Suspense fallback={<Loading />}>
            <EventPage />
          </Suspense>
        ),
      },
      {
        path: routers.about,
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: routers.event + "/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <Event />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: admin,
    element: (
      <LayoutAdmin>
        <Outlet />
      </LayoutAdmin>
    ),
    children: [
      {
        path: routers.admin.product + "/:type",
        element: (
          <Suspense fallback={<Loading />}>
            <ProductAdmin />
          </Suspense>
        ),
      },
    ],
  },
]);
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#bf9369",
        },
        components: {
          Layout: {
            /* here is your component tokens */
            siderBg: "white",
          },
          Collapse: {
            /* here is your component tokens */
            headerBg: "#fafafa",
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;

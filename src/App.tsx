import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./component/layout/LayoutKatinat";
import Home from "./page/home";
import { ConfigProvider } from "antd";
import { routers } from "./routes";
import Loading from "../src/component/loading/loadingBasic";
const About = lazy(() => import("./page/about"));
const Event = lazy(() => import("./page/event"));
const EventPage = lazy(() => import("./page/eventPage"));
const Product = lazy(() => import("./page/product"));
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
]);
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#bf9369",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;

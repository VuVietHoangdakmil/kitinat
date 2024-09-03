import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./component/layout/LayoutKatinat";
import Home from "./page/home";
import { ConfigProvider } from "antd";
import { routers } from "./routes";

const About = lazy(() => import("./page/about"));
const Event = lazy(() => import("./page/event"));
const EventPage = lazy(() => import("./page/eventPage"));

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
          <Suspense fallback={<></>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: routers.eventPage,
        element: (
          <Suspense fallback={<></>}>
            <EventPage />
          </Suspense>
        ),
      },
      {
        path: routers.about,
        element: (
          <Suspense fallback={<></>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: routers.event + "/:id",
        element: (
          <Suspense fallback={<></>}>
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

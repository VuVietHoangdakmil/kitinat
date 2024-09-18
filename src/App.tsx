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
const Blog = lazy(() => import("./page/blog"));
const ProductAdmin = lazy(() => import("./page/admin/Product"));
const CategoryAdmin = lazy(() => import("./page/admin/category"));
const MenuProductAdmin = lazy(() => import("./page/admin/menu-product"));
const BlogAdmin = lazy(() => import("./page/admin/blog"));
const ProductDetails = lazy(() => import("./page/product/[id]"));
const BlogDetails = lazy(() => import("./page/blog/[id]"));
const Info = lazy(() => import("./page/admin/info"));
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
        path: routers.blog,
        element: (
          <Suspense fallback={<Loading />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: routers.blog + "/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <BlogDetails />
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
      {
        path: routers.admin.category + "/:type",
        element: (
          <Suspense fallback={<Loading />}>
            <CategoryAdmin />
          </Suspense>
        ),
      },
      {
        path: routers.admin.menu + "/:type",
        element: (
          <Suspense fallback={<Loading />}>
            <MenuProductAdmin />
          </Suspense>
        ),
      },
      {
        path: routers.admin.blog + "/:type",
        element: (
          <Suspense fallback={<Loading />}>
            <BlogAdmin />
          </Suspense>
        ),
      },
      {
        path: routers.admin.info,
        element: (
          <Suspense fallback={<Loading />}>
            <Info />
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

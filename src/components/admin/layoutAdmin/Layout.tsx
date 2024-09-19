import { Button, Menu, Layout } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BiSolidDrink } from "react-icons/bi";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { TfiPencilAlt } from "react-icons/tfi";
import "./layout.scss";
import { FaRegUser, FaStore } from "react-icons/fa";
const { Header, Content, Sider } = Layout;
import { useInfo } from "../../../components/provider/InfoProvider";
import { MdWeb } from "react-icons/md";
type Props = {
  children: React.ReactNode;
};
import { routers, admin } from "../../../routes";
import { useSelector } from "react-redux";

const pathCusom = (pathname: string, type: "path" | "pathView") => {
  if (pathname.startsWith(routers.admin.product)) {
    if (type === "pathView") {
      return routers.admin.productView;
    }
    return routers.admin.product;
  }
  if (pathname.startsWith(routers.admin.blog)) {
    if (type === "pathView") {
      return routers.admin.blogView;
    }
    return routers.admin.blog;
  }
  if (pathname.startsWith(routers.admin.menu)) {
    if (type === "pathView") {
      return routers.admin.menuView;
    }
    return routers.admin.menu;
  }
  if (pathname.startsWith(routers.admin.store)) {
    if (type === "pathView") {
      return routers.admin.storeView;
    }
    return routers.admin.store;
  }
  if (pathname.startsWith(routers.admin.category)) {
    if (type === "pathView") {
      return routers.admin.categoryView;
    }
    return routers.admin.category;
  }
  return pathname;
};
const LayoutFC: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state) as any;
  console.log(auth);

  const { info } = useInfo();
  const [collapsed, setCollapsed] = useState(false);
  const customPath = pathCusom(pathname, "path");
  useEffect(() => {
    if (pathname === admin) {
      navigate(routers.admin.productView);
    }
  }, [pathname]);
  useEffect(() => {
    if (!auth.isLogin) {
      navigate(routers.admin.login);
    }
  }, [auth]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-white"
      >
        <Header
          style={{
            padding: 0,
            backgroundColor: "white",
            display: "flex",
            overflow: "hidden",
            justifyContent: "center",
          }}
        >
          <img width={80} height={80} alt="" src={info?.logo} />
        </Header>
        <Menu
          onClick={({ key }) => {
            const pathcustom = pathCusom(key, "pathView");
            navigate(pathcustom);
          }}
          style={{ border: "none" }}
          mode="inline"
          selectedKeys={[customPath]}
          className="bg-white"
          items={[
            {
              key: routers.admin.product,
              icon: <BiSolidDrink />,
              label: "Sản phẩm",
              children: [
                {
                  key: routers.admin.product,
                  icon: <BiSolidDrink />,
                  label: "Sản phẩm",
                },
                {
                  key: routers.admin.category,
                  icon: <BiSolidDrink />,
                  label: "Danh mục",
                },
                {
                  key: routers.admin.menu,
                  icon: <BiSolidDrink />,
                  label: "Menu",
                },
              ],
            },
            {
              key: routers.admin.blog,
              icon: <TfiPencilAlt />,
              label: "Bài viết",
            },
            {
              key: routers.admin.info,
              icon: <MdWeb />,
              label: "Thông tin Website",
            },
            {
              key: routers.admin.store,
              icon: <FaStore />,
              label: "Cửa hàng",
            },
            {
              key: routers.admin.about,
              icon: <FaRegUser />,
              label: "Về chúng tôi",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, backgroundColor: "white" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            padding: "24px 16px",
            overflow: "hidden",
            // overflowY: "scroll",
            height: "100vh",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutFC;

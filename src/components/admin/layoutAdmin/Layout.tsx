import { Button, Menu, Layout } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BiSolidDrink } from "react-icons/bi";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { TfiPencilAlt } from "react-icons/tfi";
const { Header, Content, Sider } = Layout;
type Props = {
  children: React.ReactNode;
};
import { routers, admin } from "../../../routes";

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
  return pathname;
};
const LayoutFC: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const customPath = pathCusom(pathname, "path");
  useEffect(() => {
    if (pathname === admin) {
      navigate(routers.admin.productView);
    }
  }, [pathname]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Header
          style={{
            padding: 0,
            backgroundColor: "white",
            display: "flex",
            overflow: "hidden",
            justifyContent: "center",
          }}
        >
          <img width={80} height={80} alt="" src="/img/logo.png" />
        </Header>
        <Menu
          onClick={({ key }) => {
            const pathcustom = pathCusom(key, "pathView");
            navigate(pathcustom);
          }}
          style={{ border: "none" }}
          mode="inline"
          selectedKeys={[customPath]}
          items={[
            {
              key: routers.admin.product,
              icon: <BiSolidDrink />,
              label: "Sản phẩm",
            },
            {
              key: routers.admin.blog,
              icon: <TfiPencilAlt />,
              label: "Bài viết",
            },
            {
              key: "",

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

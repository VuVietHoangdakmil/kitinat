import { useEffect, useState } from "react";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { routers } from "../../../routes";
import { useResponsive } from "../../../hook/useResponsive";
import { cn } from "../../../utils/helper/class.helper";
import { FaBars } from "react-icons/fa6";
import FloatingContactButtons from "../../FloatingContactButtons";
import { Drawer, Typography } from "antd";
type typeList = {
  label: string;
  active: boolean;
  path: string;
};

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const [open, setOpen] = useState(false);
  const list: typeList[] = [
    {
      label: "Trang chủ",
      active: routers.home === pathname,
      path: routers.home,
    },
    {
      label: "Sản phẩm",
      active: routers.product === pathname,
      path: routers.product + "?page=1",
    },
    {
      label: "Về chúng tôi",
      active: routers.about === pathname,
      path: routers.about,
    },
    { label: "Cửa hàng", active: false, path: routers.home },
    {
      label: "Tin tức & sự kiện",
      active: routers.eventPage === pathname,
      path: routers.eventPage + "?page=1",
    },
  ];
  useEffect(() => {
    if (pathname === "/") navigate(routers.home);
  }, []);
  console.log(isMobile);
  return (
    <header className={cn("header_container bg-[#233f28]")}>
      <div className="children_h1 ">
        <Link to={routers.home}>
          <img
            width="120"
            height="120"
            src="/img/logo.png"
            loading="lazy"
            alt="ECoffeeLink Coffee logo"
          />
        </Link>
        {isMobile ? (
          <>
            <button
              className="p-2 bg-[#c39568] rounded-md focus:outline-none"
              onClick={() => setOpen(true)}
            >
              <FaBars className="text-white text-xl" />
            </button>
            <Drawer open={open} onClose={() => setOpen(false)}>
              <div className="list_left">
                <ul className="nav-list">
                  {list.map((item, index) => {
                    console.log(item.active);
                    return (
                      <li
                        className={cn(
                          `p-3 rounded-lg`,
                          item.active &&
                            "text-white bg-[#233f28] cursor-pointer"
                        )}
                        onClick={() => navigate(item.path)}
                        key={index}
                      >
                        <Typography.Text
                          className={` cursor-default
                            ${item.active ?? "text-white"}`}
                          style={{
                            color: item.active ? "white" : "#233f28",
                          }}
                        >
                          {item.label}
                        </Typography.Text>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Drawer>
          </>
        ) : (
          <div className="list_left">
            <ul className="nav-list">
              {list.map((item, index) => {
                return (
                  <li
                    className={`nav-item ${item.active ? "active" : ""}`}
                    onClick={() => navigate(item.path)}
                    key={index}
                  >
                    <span className="nav-link text-white">{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <FloatingContactButtons />
    </header>
  );
};
export default Header;

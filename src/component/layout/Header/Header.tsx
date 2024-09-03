import { useEffect } from "react";
import "./Header.css";
import { useLocation, useNavigate } from "react-router-dom";
import { routers } from "../../../routes";
type typeList = {
  label: string;
  active: boolean;
  path: string;
};

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const list: typeList[] = [
    {
      label: "Trang chủ",
      active: routers.home === pathname,
      path: routers.home,
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
  return (
    <header className="header_container">
      <div className="children_h1">
        <img
          width={"2px"}
          height={"2px"}
          style={{ borderRadius: "50%" }}
          // src="img/logo.png"
        ></img>
        <div className="list_left">
          <ul>
            {list.map((item, index) => {
              return (
                <li
                  className={`${item.active ? "active" : ""}`}
                  onClick={() => navigate(item.path)}
                  key={index}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
};
export default Header;

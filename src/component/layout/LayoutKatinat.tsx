import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer/Footer";
import { useLocation } from "react-router-dom";
type Props = { children: React.ReactNode };
const Layout: React.FC<Props> = ({ children }) => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return (
    <div>
      <Header />
      <main style={{ width: "100", overflow: "hidden", margin: "0 auto" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default Layout;

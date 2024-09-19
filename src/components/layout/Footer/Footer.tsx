import { Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import "./index.css";
import { useResponsive } from "../../../hook/helpers/useResponsive";
const Footer = () => {
  const { isMobile } = useResponsive();
  return (
    <footer className="footer-main bg-[#233f28] mt-11">
      <Row
        gutter={[25, 4]}
        style={{
          width: "var(--with-main)",
          margin: "0 auto",
        }}
        justify={"space-between"}
        align={"bottom"}
      >
        <Col span={isMobile ? 24 : 12}>
          <div className="flex flex-col justify-start">
            <img
              width={"100px"}
              height={"100px"}
              src="/img/logo.png"
              loading="lazy"
              alt=""
            />
            <span className="font-medium">
              Facebook:{" "}
              <Link
                to="https://www.facebook.com/profile.php?id=61561891767086&mibextid=LQQJ4d"
                target="_blank"
              >
                e.coffeelink
              </Link>
              <br />
              Số điện thoại: 032779 9139
              <br />
              Địa chỉ: 235 Trương Thị Hoa, P. Tân Thới Hiệp, Quận 12, Ho Chi
              Minh City, Vietnam
            </span>
          </div>
        </Col>

        <Col span={isMobile ? 24 : 12}>
          <h3>VỀ CHÚNG TÔI</h3>
          <span className="font-medium">
            ECoffeeLink – HÀNH TRÌNH CHINH PHỤC PHONG VỊ MỚI ECoffeeLink không
            ngừng theo đuổi sứ mệnh mang phong vị mới từ những vùng đất trứ danh
            tại Việt Nam và trên thế giới đến khách hàng.
          </span>
        </Col>
      </Row>
      <div
        style={{
          borderTop: "1px white solid",
          textAlign: "center",
          marginTop: "20px",
          lineHeight: "50px",
          height: "50px",
        }}
      >
        <p className="text-text-primary">
          &copy; 2024
          <Typography.Link href="https://itbus.vn/" target="_blank">
            {" "}
            IT BUS
          </Typography.Link>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;

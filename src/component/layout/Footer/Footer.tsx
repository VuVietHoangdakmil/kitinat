import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import "./index.css";
import { useResponsive } from "../../../hook/useResponsive";
const Footer = () => {
  const { isMobile } = useResponsive();
  return (
    <footer className="footer-main bg-[#233f28]">
      <Row
        gutter={[25, 4]}
        style={{
          // width: "var(--with-main)",
          margin: "0 auto",
        }}
        justify={"space-between"}
        align={"bottom"}
      >
        <Col span={isMobile ? 24 : 12}>
          <div style={{ textAlign: "center" }}>
            <img
              width={"250px"}
              height={"150px"}
              src="/img/logo.png"
              loading="lazy"
              alt=""
            />
          </div>
          <h2>VỀ CHÚNG TÔI</h2>
          <h3>
            ECoffeeLink – HÀNH TRÌNH CHINH PHỤC PHONG VỊ MỚI ECoffeeLink không
            ngừng theo đuổi sứ mệnh mang phong vị mới từ những vùng đất trứ danh
            tại Việt Nam và trên thế giới đến khách hàng.
          </h3>
        </Col>
        <Col span={isMobile ? 24 : 12}>
          <h2>LIÊN HỆ</h2>
          <h3>
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
            Địa chỉ: 235 Trương Thị Hoa, P. Tân Thới Hiệp, Quận 12, Ho Chi Minh
            City, Vietnam
          </h3>
          {/* <h2>HỖ TRỢ VÀ CHÍNH SÁCH</h2>
          <ul style={{ margin: "0", padding: "0" }}>
            <div style={{ display: "divst-item" }}>
              <h3>- Quy chế hoạt động và Chính sách bảo mật.</h3>
            </div>
            <div>
              <h3>- Chính sách vận chuyển.</h3>
            </div>
            <div>
              <h3>- Chính sách thanh toán.</h3>
            </div>
          </ul> */}
        </Col>
      </Row>
      <div
        style={{
          borderTop: "1px white solid",
          textAlign: "center",

          lineHeight: "60px",
          height: "60px",
        }}
      ></div>
    </footer>
  );
};
export default Footer;

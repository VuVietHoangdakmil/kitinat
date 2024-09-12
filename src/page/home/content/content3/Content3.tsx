import { Row, Col } from "antd";

const Content3 = () => {
  return (
    <Row gutter={22} style={{ height: "100%" }}>
      <Col span={8}>
        <h1 style={{ color: "var(--primary-color)", textAlign: "center" }}>
          Cà Phê
        </h1>
        <div
          className="css-background-img"
          style={{
            height: "600px",
            backgroundImage: "url(/img/product/product11.jpg)",
          }}
        ></div>
      </Col>
      <Col span={8}>
        <h1 style={{ color: "var(--primary-color)", textAlign: "center" }}>
          Cà Phê
        </h1>
        <div
          className="css-background-img"
          style={{
            height: "600px",
            backgroundImage: "url(/img/product/product9.jpg)",
          }}
        ></div>
      </Col>
      <Col span={8}>
        <h1 style={{ color: "var(--primary-color)", textAlign: "center" }}>
          Cà Phê
        </h1>
        <div
          className="css-background-img"
          style={{
            height: "600px",
            backgroundImage: "url(/img/product/product6.jpg)",
          }}
        ></div>
      </Col>
    </Row>
  );
};
export default Content3;

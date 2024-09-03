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
            backgroundImage: "url(/img/home/content3/content3a.jpg)",
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
            backgroundImage: "url(/img/home/content3/content3b.png)",
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
            backgroundImage: "url(/img/home/content3/content3c.png)",
          }}
        ></div>
      </Col>
    </Row>
  );
};
export default Content3;

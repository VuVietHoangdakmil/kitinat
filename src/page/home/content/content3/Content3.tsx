import { Col, List, Row, Typography } from "antd";

const Content3 = () => {
  const coffeeImages = [
    "/img/product/product11.jpg",
    "/img/product/cafe.jpg",
    "/img/product/product6.jpg",
  ];

  return (
    <Row gutter={22}>
      <Col span={24}>
        <div className="flex flex-col justify-center items-center ">
          <Typography.Title style={{ color: " var(--primary-color)" }}>
            Best Seller
          </Typography.Title>
        </div>
      </Col>
      <List
        className=" w-full"
        dataSource={coffeeImages}
        grid={{ gutter: [40, 40], xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 3 }}
        renderItem={(image, index) => (
          <List.Item className="w-full max-w-[38rem]" key={index}>
            <h1
              style={{
                color: "var(--primary-color)",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              {index === 0 ? "Trà" : index === 1 ? "Cà phê" : "Nước ép"}
            </h1>
            <div
              className="css-background-img transform transition-transform duration-500 ease-in-out hover:-translate-y-5 cursor-pointer"
              style={{
                height: "450px",
                backgroundImage: `url(${image})`,
              }}
            ></div>
          </List.Item>
        )}
      />
    </Row>
  );
};
export default Content3;

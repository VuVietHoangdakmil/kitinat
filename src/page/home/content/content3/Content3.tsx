import { List, Row } from "antd";

const Content3 = () => {
  const coffeeImages = [
    "/img/product/product11.jpg",
    "/img/product/cafe.jpg",
    "/img/product/product6.jpg",
  ];

  return (
    <Row gutter={22}>
      <List
        className=" w-full"
        dataSource={coffeeImages}
        grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 3 }}
        renderItem={(image, index) => (
          <List.Item className="w-full" key={index}>
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
              className="css-background-img"
              style={{
                height: "600px",
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

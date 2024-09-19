import { useTransition, animated } from "@react-spring/web";
import { Button, Col, Row, Image, Typography } from "antd";
import { useResponsive } from "../../hook/helpers/useResponsive";

type PropsContent = {
  content1: string;
  content2: string;
  content3: { title: string; value: string };
  content4: { title: string; value: string };
  img: string;
  wrapCol?: boolean;
};

const CustomContent: React.FC<PropsContent> = ({
  content1,
  content2,
  content3,
  content4,
  img,
  wrapCol,
}) => {
  return (
    <Row
      gutter={16}
      style={{ flexDirection: wrapCol ? "row-reverse" : undefined }}
    >
      <Col span={12}>
        <Typography.Title level={3} style={{ color: "var(--primary-color)" }}>
          {content1}
        </Typography.Title>
        <Typography.Title level={5} style={{ color: "#114358" }}>
          {content2}
        </Typography.Title>
        <ul style={{ margin: "0", padding: "0 0 0 15px" }}>
          <li style={{ color: "#114358" }}>
            <span
              style={{
                color: "var(--primary-color)",

                fontWeight: "bold",
              }}
            >
              {content3.title}
            </span>{" "}
            {content3.value}
          </li>
          <li style={{ color: "#114358" }}>
            <span style={{ color: "var(--primary-color)", fontWeight: "bold" }}>
              {content4.title}
            </span>
            {content4.value}
          </li>
        </ul>
        <Button
          style={{ marginTop: "50px", width: "100px" }}
          className="material-bubble"
        >
          Menu
        </Button>
      </Col>
      <Col span={12}>
        <Image
          width="100%"
          height="500px"
          style={{ borderRadius: "50px", overflow: "hidden" }}
          src={img}
          preview={false}
        />
      </Col>
    </Row>
  );
};
const Menu = () => {
  const transitions = useTransition(null, {
    keys: null,
    from: { opacity: 0, transform: "translate3d(0,-100%,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    //leave: { opacity: 0, transform: "translate3d(0,100%,0)" },
    config: { duration: 500 },
  });
  const { isMobile } = useResponsive();

  return (
    <div style={{ marginTop: "50px" }}>
      {transitions((style) => (
        <animated.div style={style}>
          {" "}
          <img
            src="/img/view/view2.jpg"
            className="img-zoom-animation"
            width="99%"
            style={{
              padding: "0",
              margin: "0 auto",
              borderRadius: "10px",
              display: "block",
              height: "500px",
            }}
            alt=""
          />
          <div
            style={{
              textAlign: "center",
              width: isMobile ? "100%" : "var(--with-main)",
              margin: "0 auto",
            }}
            className="mt-16 "
          >
            <Typography.Title
              style={{ color: "var(--primary-color)", textAlign: "center" }}
              className="mt-10"
            >
              Hành trình chinh phục phong vị mới
            </Typography.Title>
            <div style={{ margin: "50px auto" }} className="w-[80%] bg-current">
              <Row>
                <Col span={8}>
                  <Typography.Title
                    level={1}
                    style={{ color: "var(--primary-color)" }}
                  >
                    8
                  </Typography.Title>
                  <Typography.Title level={4} style={{ color: "#114358" }}>
                    Năm trên một hành trình
                  </Typography.Title>
                </Col>
                <Col span={8}>
                  {" "}
                  <Typography.Title style={{ color: "var(--primary-color)" }}>
                    10
                  </Typography.Title>
                  <Typography.Title level={4} style={{ color: "#114358" }}>
                    Tỉnh thành
                  </Typography.Title>
                </Col>
                <Col span={8}>
                  <Typography.Title style={{ color: "var(--primary-color)" }}>
                    70+
                  </Typography.Title>
                  <Typography.Title level={4} style={{ color: "#114358" }}>
                    Trên toàn quốc gia
                  </Typography.Title>
                </Col>
              </Row>
              <div
                style={{ color: "var(--primary-color)" }}
                className="text-2xl mt-5 w-full"
              >
                Từ niềm đam mê khám phá hương vị ở những vùng đất mới, những
                nghệ nhân ECoffeeLink không ngừng theo đuổi sứ mệnh mang đến
                phong vị mới cho khách hàng. Sự kết hợp của nguồn nguyên liệu
                tinh hoa dưới bàn tay của nghệ nhân ECoffeeLink sẽ mang đến cho
                khách hàng những trải nghiệm cảm nhận hương vị tinh tế và khó
                quên.{" "}
              </div>
            </div>
          </div>
        </animated.div>
      ))}

      <div style={{ margin: "0px auto" }} className="w-1/2">
        <div style={{ margin: "50px auto" }} className="flex flex-col gap-16">
          <CustomContent
            content1="Cà Phê"
            content2="  Dưới bàn tay của nghệ nhân tại ECoffeeLink, từng cốc cà phê trở thành
            một cuộc phiêu lưu hương vị đầy mới lạ."
            content3={{
              title: "CÀ PHÊ ESPRESSO",
              value:
                " – Bộ sưu tập Cà Phê Phin với công thức độc quyền ECoffeeLink, làm bật nên vị đậm đặc trưng của Robusta Buôn Mê Thuột, tạo nên hương vị sáng tạo khó phai.",
            }}
            content4={{
              title: "CÀ PHÊ ESPRESSO",
              value:
                " – Bộ sưu tập Cà Phê Phin với công thức độc quyền ECoffeeLink, làm bật nên vị đậm đặc trưng của Robusta Buôn Mê Thuột, tạo nên hương vị sáng tạo khó phai.",
            }}
            img="/img/view/view8.jpg"
          />
          <CustomContent
            wrapCol={true}
            content1="Cà Phê"
            content2="  Dưới bàn tay của nghệ nhân tại ECoffeeLink, từng cốc cà phê trở thành
            một cuộc phiêu lưu hương vị đầy mới lạ."
            content3={{
              title: "CÀ PHÊ ESPRESSO",
              value:
                " – Bộ sưu tập Cà Phê Phin với công thức độc quyền ECoffeeLink, làm bật nên vị đậm đặc trưng của Robusta Buôn Mê Thuột, tạo nên hương vị sáng tạo khó phai.",
            }}
            content4={{
              title: "CÀ PHÊ ESPRESSO",
              value:
                " – Bộ sưu tập Cà Phê Phin với công thức độc quyền ECoffeeLink, làm bật nên vị đậm đặc trưng của Robusta Buôn Mê Thuột, tạo nên hương vị sáng tạo khó phai.",
            }}
            img="/img/view/view7.jpg
            "
          />
        </div>
        <div style={{ textAlign: "center", margin: "0 auto" }}>
          <Typography.Title level={5} style={{ color: "#114358" }}>
            Từng búp trà, từng hạt cà phê là nguồn cảm hứng bất tận cho những
            công thức đột phá, những sản phẩm tâm huyết giúp ECoffeeLink chinh
            phục vị giác của khách hàng. ECoffeeLink tự hào mang đến những sản
            phẩm với hương vị đặc sắc, và bạn chính là một phần đặc biệt của…
          </Typography.Title>
          <Typography.Title
            level={2}
            style={{
              color: "var(--primary-color)",
            }}
          >
            ...HÀNH TRÌNH CHINH PHỤC PHONG VỊ MỚI!
          </Typography.Title>
        </div>
      </div>
    </div>
  );
};
export default Menu;

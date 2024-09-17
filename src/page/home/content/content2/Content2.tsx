import { useTransition, useSpringRef, animated } from "@react-spring/web";
import { useEffect } from "react";
import useInViewCustom from "../../../../hook/useInviewCustom";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Typography } from "antd";
import { routers } from "../../../../routes";
const listTrantions = [
  { from: { transform: "translate3d(0,-100%,0)" }, type: "text" },
  { from: { transform: "translate3d(0,200%,0)" }, type: "button" },
];

const ContentLeft = () => {
  const transRef = useSpringRef();
  const navigate = useNavigate();
  const transitions = useTransition(listTrantions, {
    ref: transRef,
    keys: null,
    from: (props: any) => ({ opacity: 0, transform: props.from.transform }),
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    config: { duration: 600 },
  });
  useEffect(() => {
    transRef.start();
  }, []);
  return transitions((style, item) => {
    return (
      <animated.div style={style}>
        {item.type === "text" && (
          <div style={{ color: " var(--primary-color)" }}>
            <Typography.Title
              className="text-text-primary"
              style={{ color: " var(--primary-color)" }}
            >
              Về chúng tôi
            </Typography.Title>
            <h2 className="my-5">
              ECoffeeLink Coffee & Tea House – HÀNH TRÌNH CHINH PHỤC PHONG VỊ
              MỚI
            </h2>
            <h3>
              Hành trình luôn bắt đầu từ việc chọn lựa nguyên liệu kỹ càng từ
              các vùng đất trù phú, cho đến việc bảo quản, pha chế từ bàn tay
              nghệ nhân. Qua những nỗ lực không ngừng, ECoffeeLink luôn hướng
              đến...
            </h3>
          </div>
        )}
        {item.type === "button" && (
          <Button
            onClick={() => navigate(routers.about)}
            style={{ width: "165px", height: "40px", marginTop: "50px" }}
            className="material-bubble"
          >
            Xem thêm
          </Button>
        )}
      </animated.div>
    );
  });
};
const ContentRight = () => {
  const transRef = useSpringRef();
  const transitions = useTransition(null, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: "translate3d(30%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },

    config: { duration: 600 },
  });
  useEffect(() => {
    transRef.start();
  }, []);
  return transitions((style) => (
    <animated.div style={style}>
      {" "}
      <img
        style={{ borderRadius: "6px" }}
        width="100%"
        height="500px"
        src="/img/elink5.jpg"
        loading="lazy"
        className="transform transition-transform duration-500 ease-in-out hover:scale-110 hover:rotate-6"
      />
    </animated.div>
  ));
};
const Content2: React.FC = () => {
  const { ref, inView } = useInViewCustom();

  return (
    <Row ref={ref} gutter={[20, 20]}>
      {inView && (
        <>
          <Col span={12} xs={24} sm={12} md={8} lg={12}>
            <ContentLeft />
          </Col>
          <Col span={12} xs={24} sm={12} md={8} lg={12}>
            <ContentRight />
          </Col>
        </>
      )}
    </Row>
  );
};
export default Content2;

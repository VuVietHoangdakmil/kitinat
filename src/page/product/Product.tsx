import { useSearchParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { Col, Pagination, Row } from "antd";

import { animated, useTransition } from "@react-spring/web";

import { SLIDES } from "../home/content/content5/Content5";
const totalPage = SLIDES.length;
const pageSize = 8;

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageCurrent = Number(searchParams.get("page"));

  const transitions = useTransition(null, {
    keys: pageCurrent,
    from: { transform: "translate3d(-20%,0%,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    config: { duration: 500 },
  });

  const data = useMemo(() => {
    const endPage = pageCurrent * pageSize;
    const startPage = endPage - pageSize;
    return SLIDES.slice(startPage, endPage);
  }, [pageCurrent]);

  return (
    <div
      style={{
        width: "var(--with-main)",
        margin: "20px auto",
        color: "var(--text-black-color)",
      }}
    >
      <h1 style={{ fontSize: "25px" }}>Sản phẩm</h1>
      <hr />

      {transitions((style) => (
        <animated.div style={style}>
          <Row style={{ zIndex: 1 }} gutter={20}>
            {data.map(({ properties }, index) => {
              const { content, src, link } = properties;
              return (
                <Col
                  span={6}
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(link + "")}
                >
                  <img
                    className="img-zoom-animation"
                    style={{ borderRadius: "5px" }}
                    alt=""
                    loading="lazy"
                    src={src}
                    width="100%"
                    height={"400px"}
                  />
                  <p style={{ fontWeight: "bold" }}>{content?.content2}</p>
                  <p style={{ color: "#999999" }}>
                    {content?.content3?.replace("By KATINAT", "ON: ")}
                  </p>
                  <p>{content?.content4}</p>
                </Col>
              );
            })}
          </Row>
        </animated.div>
      ))}

      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={{ marginRight: "10px" }}>
          Trang
          <span
            style={{
              color: "var(--primary-color)",
              fontWeight: "bold",
              margin: "0 5px",
            }}
          >
            {pageCurrent}
          </span>
          Trên
          <span
            style={{
              color: "var(--primary-color)",
              fontWeight: "bold",
              margin: "0 5px",
            }}
          >
            {Math.ceil(totalPage / pageSize)}
          </span>
        </p>
        <Pagination
          current={pageCurrent}
          onChange={(page) => {
            setSearchParams({ page: page + "" });
          }}
          showSizeChanger={false}
          responsive={true}
          total={totalPage}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};
export default Product;

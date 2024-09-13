import { Flex, Image, List, Pagination, Row, Typography } from "antd";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { animated, useTransition } from "@react-spring/web";

import { SLIDES } from "../home/content/content5/Content5";
import { useResponsive } from "../../hook/useResponsive";
const totalPage = SLIDES.length;
const pageSize = 8;

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageCurrent = Number(searchParams.get("page"));
  const { isMobile } = useResponsive();

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
        width: isMobile ? "100%" : "var(--with-main)",
        margin: "20px auto",

        color: "var(--text-black-color)",
      }}
      className="px-4"
    >
      <h1 style={{ fontSize: "25px" }}>Sản phẩm</h1>
      <hr />

      {transitions((style) => (
        <animated.div style={style}>
          <Row style={{ zIndex: 1 }}>
            <List
              dataSource={data}
              grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }}
              renderItem={(item, index) => {
                const { content, src, link } = item.properties;
                return (
                  <List.Item className="w-full max-w-[38rem] ">
                    <Flex
                      key={index}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(link + "")}
                      className="h-full overflow-hidden  w-full"
                      vertical
                      gap={4}
                    >
                      <Image
                        style={{ borderRadius: "5px" }}
                        alt=""
                        loading="lazy"
                        src={src}
                        preview={false}
                        className="w-full rounded-2xl h-[20rem] object-center"
                      />
                      <Typography.Text style={{ fontWeight: "bold" }}>
                        {content?.content2}
                      </Typography.Text>
                      <Typography.Text style={{ color: "#999999" }}>
                        {content?.content3?.replace("By ECoffeeLink", "ON: ")}
                      </Typography.Text>
                      <Typography.Text>{content?.content4}</Typography.Text>
                    </Flex>
                  </List.Item>
                );
              }}
            />
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

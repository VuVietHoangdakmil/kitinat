import { Flex, Image, List, Pagination, Row, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { animated, useTransition } from "@react-spring/web";
import { Product as TypeProduct } from "../../types/product";

// Import hiệu ứng mờ khi tải
import { useResponsive } from "../../hook/useResponsive";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { routers } from "../../routes";
import { cn } from "../../utils/helper/class.helper";

const pageSize = 8;

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Partial<TypeProduct[]>>([]);
  const pageCurrent = Number(searchParams.get("page"));
  const { isMobile } = useResponsive();
  const totalPage = products.length;
  const transitions = useTransition(null, {
    keys: pageCurrent,
    from: { transform: "translate3d(-20%,0%,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    config: { duration: 500 },
  });

  const data = useMemo(() => {
    const endPage = pageCurrent * pageSize;
    const startPage = endPage - pageSize;
    return products.slice(startPage, endPage);
  }, [pageCurrent, products.length]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productsList: any[] =
        productsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            key: doc.id,
            ...data,
          };
        }) ?? [];

      setProducts(productsList);
      setLoading(false);
    };

    fetchProducts();
  }, []);
  return (
    <div
      style={{
        margin: "20px auto",

        color: "var(--text-black-color)",
      }}
      className={cn(isMobile ? "w-full" : "w-4/6")}
    >
      <h1 style={{ fontSize: "25px" }}>Sản phẩm</h1>
      <hr style={{ margin: "10px 0px" }} />

      {transitions((style) => (
        <animated.div style={style}>
          <Row style={{ zIndex: 1 }}>
            <List
              dataSource={data}
              grid={{
                gutter: [16, 24],
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 3,
                xxl: 3,
              }}
              renderItem={(item, index) => {
                return (
                  <List.Item className="w-full max-w-[38rem] transform transition-transform duration-500 ease-in-out hover:-translate-y-5 cursor-pointer">
                    <Flex
                      key={index}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(routers.product + "/" + item?.key)
                      }
                      className="h-full overflow-hidden  w-full"
                      vertical
                      gap={4}
                    >
                      <Image
                        style={{
                          borderRadius: "5px",
                          height: "400px",
                          width: "100%",
                        }}
                        alt=""
                        loading="lazy"
                        src={item?.uploadImg}
                        preview={false}
                        className=" rounded-2xl  object-center"
                      />

                      <Typography.Text className="text-xl font-medium">
                        {item?.title}
                      </Typography.Text>

                      <Typography.Text>
                        {!item?.price
                          ? 0 + "đ"
                          : Number(item?.price).toLocaleString("en-US") + "đ"}
                      </Typography.Text>
                    </Flex>
                  </List.Item>
                );
              }}
              loading={loading}
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

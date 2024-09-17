import { Card, Flex, Image, List, Pagination, Row } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { animated, useTransition } from "@react-spring/web";
import { Blog as TypeBlog } from "../../types/blogs";
import "../../css/hidden-scroll.css";
// Import hiệu ứng mờ khi tải
import { useResponsive } from "../../hook/useResponsive";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { routers } from "../../routes";

const pageSize = 8;

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<Partial<TypeBlog[]>>([]);
  const pageCurrent = Number(searchParams.get("page"));
  const { isMobile } = useResponsive();
  const totalPage = blogs.length;
  const transitions = useTransition(null, {
    keys: pageCurrent,
    from: { transform: "translate3d(-20%,0%,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    config: { duration: 500 },
  });

  const data = useMemo(() => {
    const endPage = pageCurrent * pageSize;
    const startPage = endPage - pageSize;
    return blogs.slice(startPage, endPage);
  }, [pageCurrent, blogs.length]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const BlogsCollection = collection(db, "blogs");
      const BlogsSnapshot = await getDocs(BlogsCollection);
      const BlogsList: any[] =
        BlogsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            key: doc.id,
            ...data,
          };
        }) ?? [];

      setBlogs(BlogsList);
      setLoading(false);
    };

    fetchBlogs();
  }, []);
  return (
    <div
      style={{
        width: isMobile ? "100%" : "var(--with-main)",
        margin: "20px auto",

        color: "var(--text-black-color)",
      }}
      className="px-4 container-hidden-scroll"
    >
      <h1>Bài viết</h1>
      <hr style={{ margin: "10px 0px" }} />

      {transitions((style) => (
        <animated.div style={style}>
          <Row style={{ zIndex: 1 }}>
            <List
              dataSource={data}
              grid={{
                gutter: [28, 14],
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 3,
                xxl: 3,
              }}
              renderItem={(item, index) => {
                return (
                  <List.Item key={index}>
                    <Card
                      hoverable
                      onClick={() => navigate(routers.blog + "/" + item?.key)}
                      style={{
                        overflow: "hidden",
                        width: "100%",
                        border: "1px #ebebeb solid ",
                      }}
                      cover={
                        <Image
                          style={{
                            height: "250px",
                            width: "100%",

                            borderRadius: "0px",
                          }}
                          alt=""
                          loading="lazy"
                          src={item?.img}
                          preview={false}
                          className=" rounded-2xl "
                        />
                      }
                    >
                      <div className="h-[250px] container-hidden-scroll">
                        <h1>{item?.title}</h1>
                        <p className="text-[16px] text-[#404040]">
                          {item?.summary}
                        </p>
                      </div>
                    </Card>
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
export default Blog;

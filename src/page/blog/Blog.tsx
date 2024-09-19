import { Card, Image, List, Pagination, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { animated, useTransition } from "@react-spring/web";
import { Blog as TypeBlog } from "../../types/data/blogs";
import "../../css/hidden-scroll.css";
// Import hiệu ứng mờ khi tải
import { useResponsive } from "../../hook/useResponsive";

import { routers } from "../../routes";

import { getBlog } from "../../services/blog.service";
const pageSize = 8;

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<TypeBlog[]>([]);
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
      const blogs = (await getBlog()) as any;

      const BlogsList: TypeBlog[] =
        blogs.map((item: any) => {
          return {
            key: item.id,
            ...item,
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
      <Typography.Title>Bài viết</Typography.Title>
      <hr style={{ margin: "10px 0px" }} />

      {transitions((style) => (
        <animated.div style={style}>
          <List
            dataSource={data}
            grid={{
              gutter: [28, 14],
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 4,
              xxl: 4,
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
                    className="hover:border-border-color hover:shadow-none shadow-lg bg-card  cursor-pointer transition-all"
                    cover={
                      <Image
                        style={{
                          height: "250px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                        alt=""
                        loading="lazy"
                        src={item?.img}
                        preview={false}
                      />
                    }
                  >
                    <div className=" container-hidden-scroll">
                      <Typography.Title level={3}>
                        {item?.title}
                      </Typography.Title>
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

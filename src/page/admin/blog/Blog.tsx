import TableBlog from "../../../components/admin/table/blog";
import BlogCrud from "../../../components/admin/PageCrud/blog";
import { useParams, useNavigate } from "react-router-dom";
import { PageCRUD } from "../../../types/enum";
import { FaPlus } from "react-icons/fa";

import { Button } from "antd";
import { routers } from "../../../routes";

const Blog = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  return (
    <>
      {type === PageCRUD.VIEW ? (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              icon={<FaPlus />}
              type="primary"
              style={{
                margin: "0 0 10px 0",
                height: "40px",
              }}
              onClick={() => navigate(routers.admin.blogCreate)}
            >
              Thêm mới
            </Button>
          </div>
          <TableBlog />
        </>
      ) : type === PageCRUD.UPDATE || type === PageCRUD.CREATE ? (
        <BlogCrud type={type + ""} />
      ) : (
        <div></div>
      )}
    </>
  );
};
export default Blog;

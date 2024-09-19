import React, { useEffect, useState } from "react";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { Image, Modal } from "antd";
import type { TableProps } from "antd";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { routers } from "../../../../routes";
import "./blog.css";
import { getBlog, deleteBlog } from "../../../../services/blog.service";
import { Blog } from "../../../../types/data/blogs";

import AppTable from "../../../shared/app-table";
const ProductTable: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const columns: TableProps<Blog>["columns"] = [
    {
      title: "Hình",
      dataIndex: "img",
      key: "img",
      width: "200px",
      render: (src) => (
        <Image
          style={{ borderRadius: "10px" }}
          width={100}
          height={100}
          src={src}
        />
      ),
      align: "center",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "Tóm tắt",
      dataIndex: "summary",
      key: "summary",
      align: "center",
    },

    {
      width: "200px",
      title: "Hành động",
      dataIndex: "key",
      key: "action",
      align: "center",
      render: (key) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button
              className="action-btn"
              style={{
                backgroundColor: "#08e783",
                height: "40px",
                width: "40px",
                fontSize: "20px",
                color: "white",
                textAlign: "center",
                lineHeight: "40px",
                borderRadius: "10px",
                border: "none",
                display: "flex",

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaEye />
            </button>
            <button
              onClick={() => navigate(routers.admin.blogUpdate + "?id=" + key)}
              className="action-btn"
              style={{
                backgroundColor: "#416dea",
                height: "40px",
                width: "40px",
                fontSize: "20px",
                color: "white",
                textAlign: "center",
                lineHeight: "40px",
                borderRadius: "10px",
                border: "none",
                display: "flex",

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CiEdit />
            </button>
            <button
              className="action-btn text-center"
              onClick={() => handleDelete(key)}
              style={{
                backgroundColor: "#f82222",
                height: "40px",
                width: "40px",
                fontSize: "20px",
                color: "white",
                textAlign: "center",
                lineHeight: "40px",
                borderRadius: "10px",
                border: "none",
                display: "flex",

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaRegTrashAlt />
            </button>
          </div>
        );
      },
    },
  ];
  const handleDelete = (key: string) => {
    Modal.confirm({
      title: "Bạn có muốn xóa sản phẩm này không?",

      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk: async () => {
        try {
          await deleteBlog(Number(key));
          setData(data.filter((item) => item.key !== key));
        } catch (error) {
          console.error("Error deleting document: ", error);
          Modal.error({
            title: "Error",
            content: "Failed to delete the product. Please try again.",
          });
        }
      },
    });
  };
  useEffect(() => {
    const fetchblogs = async () => {
      setLoading(true);
      const blogs: Blog[] = (await getBlog()) as any;

      const blogsCustom: Blog[] = blogs.map((item: any) => {
        return {
          key: item.id,
          id: item.id,
          img: item?.img ?? "",
          title: item?.title ?? "",
          summary: item?.summary ?? "",
        };
      });

      setData(blogsCustom);
      setLoading(false);
    };

    fetchblogs();
  }, []);

  return (
    <AppTable
      loading={loading}
      scroll={{ y: "65vh" }}
      columns={columns}
      dataSource={data}
    />
  );
};

export default ProductTable;

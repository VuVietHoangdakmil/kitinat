import React, { useEffect, useState } from "react";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { Table, Image, Modal } from "antd";
import type { TableProps } from "antd";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { routers } from "../../../../routes";
import "./blog.css";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import { Blog } from "../../../../types/blogs";

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
          await deleteDoc(doc(db, "blogs", key));
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
      const blogsCollection = collection(db, "blogs");
      const blogsSnapshot = await getDocs(blogsCollection);
      const blogsList = blogsSnapshot.docs.map((doc) => {
        const data = doc.data() as Blog;
        return {
          key: doc.id,
          img: data.img || "",
          title: data.title || "",
          summary: data.summary || "",
        } as Blog;
      });

      setData(blogsList);
      setLoading(false);
    };

    fetchblogs();
  }, []);

  return (
    <Table
      loading={loading}
      scroll={{ y: "65vh" }}
      columns={columns}
      dataSource={data}
    />
  );
};

export default ProductTable;

import React, { useEffect, useState } from "react";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { Table, Image, Modal } from "antd";
import type { TableProps } from "antd";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { routers } from "../../../../routes";
import "./product.css";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
interface DataType {
  key: string;
  uploadImg: string;
  title: string;
  chuyen_muc: string;
  price: string;
  priceDiscount: string;
}

const ProductTable: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Hình",
      dataIndex: "uploadImg",
      key: "uploadImg",
      render: (src) => <Image height={100} src={src} />,
      align: "center",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "Chuyên mục",
      dataIndex: "chuyen_muc",
      key: "chuyen_muc",
      align: "center",
    },
    {
      title: "Giá",
      key: "price",
      dataIndex: "price",
      align: "center",
      render: (price) => Number(price).toLocaleString("en-US") + "đ",
    },
    {
      title: "Giá khuyến mãi",
      key: "price_discount",
      dataIndex: "priceDiscount",
      align: "center",
      render: (priceDiscoun) =>
        Number(priceDiscoun).toLocaleString("en-US") + "đ",
    },
    {
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
              onClick={() =>
                navigate(routers.admin.productUpdate + "?id=" + key)
              }
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
          await deleteDoc(doc(db, "products", key));
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
    const fetchProducts = async () => {
      setLoading(true);
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          key: doc.id,
          uploadImg: data.uploadImg || "",
          title: data.title || "",
          chuyen_muc: data.chuyen_muc || "",
          price: data.price || "",
          priceDiscount: data.priceDiscount || "",
        } as DataType;
      });

      setData(productsList);
      setLoading(false);
    };

    fetchProducts();
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

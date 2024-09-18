import type { TableProps } from "antd";
import { Image, Modal, Typography } from "antd";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { db } from "../../../../firebase";
import { routers } from "../../../../routes";
import AppTable from "../../../shared/app-table";
import "./product.css";
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
      render: (src) => (
        <Image height={48} width={48} src={src} className="rounded-lg" />
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <Typography.Text className=" font-medium">{text}</Typography.Text>
      ),
    },
    {
      title: "Chuyên mục",
      dataIndex: "chuyen_muc",
      key: "chuyen_muc",
    },
    {
      title: "Giá",
      key: "price",
      dataIndex: "price",
      render: (price) => Number(price).toLocaleString("en-US") + "đ",
    },
    {
      title: "Giá khuyến mãi",
      key: "price_discount",
      dataIndex: "priceDiscount",
      render: (priceDiscoun) =>
        Number(priceDiscoun).toLocaleString("en-US") + "đ",
    },
    {
      title: "Hành động",
      dataIndex: "key",
      key: "action",
      render: (key) => {
        return (
          <div className="flex gap-4 items-center  justify-start">
            <CiEdit
              className="text-[#416dea] cursor-pointer"
              onClick={() =>
                navigate(routers.admin.productUpdate + "?id=" + key)
              }
            />
            <FaRegTrashAlt
              className="text-[#f82222] cursor-pointer"
              onClick={() => handleDelete(key)}
            />
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
    <AppTable loading={loading} columns={columns as any} dataSource={data} />
  );
};

export default ProductTable;

import type { TableProps } from "antd";
import { Image, Modal, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { usePagination } from "../../../../hook/helpers/usePagination.hook";
import { routers } from "../../../../routes";
import {
  deleteProduct,
  getListProducts,
} from "../../../../services/product.service";
import { notifySuccess } from "../../../../utils/helper/notify.helper";
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
  // const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(loading);
  const {
    data: listProduct,
    isLoading,
    refresh,
  } = usePagination("list-product", {}, getListProducts);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Hình",
      dataIndex: "image",
      key: "uploadImg",
      render: (src) => (
        <Image height={48} width={48} src={src} className="rounded-lg" />
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "name",
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
      dataIndex: "variants",
      render: (variants) => (
        <div>
          {variants.map((variant: any) => (
            <div className="flex items-center gap-4">
              <Typography.Text className="uppercase text-text-primary font-medium">
                {variant.size}
              </Typography.Text>
              <Typography.Text>
                {Number(variant.price).toLocaleString("en-US") + "đ"}
              </Typography.Text>
            </div>
          ))}
        </div>
      ),
    },

    {
      title: "Hành động",
      dataIndex: "id",
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
          await deleteProduct(key);
          refresh();
          notifySuccess("Xoá thành công");
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
      // const productsCollection = collection(db, "products");
      // const productsSnapshot = await getDocs(productsCollection);
      // const productsList = productsSnapshot.docs.map((doc) => {
      //   const data = doc.data();
      //   return {
      //     key: doc.id,
      //     uploadImg: data.uploadImg || "",
      //     title: data.title || "",
      //     chuyen_muc: data.chuyen_muc || "",
      //     price: data.price || "",
      //     priceDiscount: data.priceDiscount || "",
      //   } as DataType;
      // });

      // setData(productsList);
      setLoading(false);
    };

    fetchProducts();
  }, []);
  console.log(listProduct);

  return (
    <AppTable
      loading={isLoading}
      columns={columns as any}
      dataSource={listProduct}
    />
  );
};

export default ProductTable;

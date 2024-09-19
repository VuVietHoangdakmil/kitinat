import React, { useEffect, useState } from "react";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { Image, Modal, Tag } from "antd";
import type { TableProps } from "antd";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { routers } from "../../../../routes";
import "./Store.css";
import { Store } from "../../../../types/data/store";
import { getStore, deleteStore } from "../../../../services/stores.service";

import AppTable from "../../../shared/app-table";
const ProductTable: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const columns: TableProps<Store>["columns"] = [
    {
      title: "Hình ảnh",
      dataIndex: "images",
      key: "images",
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
      title: "Tên cửa hàng",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "is_open",
      key: "is_open",
      align: "center",
      render: (is_open) => {
        return is_open ? (
          <Tag color="green">Mở cửa</Tag>
        ) : (
          <Tag color="red">Đóng cửa</Tag>
        );
      },
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
              onClick={() => navigate(routers.admin.storeUpdate + "?id=" + key)}
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
      title: "Bạn có muốn xóa cửa này không?",

      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk: async () => {
        try {
          await deleteStore(Number(key));
          setData(data.filter((item) => item?.key + "" !== key));
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
      const stores = (await getStore()) as any;

      const storesCustom: Store[] = stores.map((store: Store) => {
        return {
          key: store.id,
          name: store.name,
          address: store.address,

          is_open: store.is_open,
          images: store.images,
        };
      });

      setData(storesCustom);
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

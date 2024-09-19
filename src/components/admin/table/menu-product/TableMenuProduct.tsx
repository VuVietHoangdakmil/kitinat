import { Image, Popconfirm } from "antd";
import { usePagination } from "../../../../hook/helpers/usePagination.hook";
import {
  deleteMenuProductByIndex,
  getMenusProduct,
} from "../../../../services/product.service";
import AppTable from "../../../shared/app-table";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { routers } from "../../../../routes";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  notifyError,
  notifySuccess,
} from "../../../../utils/helper/notify.helper";

const TableMenuProduct = () => {
  const navigate = useNavigate();

  const {
    data: listMenus,
    isLoading,
    refresh,
  } = usePagination("list-menu", {}, getMenusProduct);

  const handleDelete = async (key: number) => {
    try {
      await deleteMenuProductByIndex(key);
      notifySuccess("Xoá thành công");
      refresh();
    } catch (error: any) {
      notifyError(error.response.data.message);
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Số trang",
      dataIndex: "index",
    },
    {
      title: "File",
      dataIndex: "image",
      render: (url: string) => (
        <Image
          width={48}
          height={48}
          className="w-12 h-12 rounded-lg"
          src={url}
        />
      ),
    },
    {
      title: "Loaị file",
      dataIndex: "type",
    },
    {
      title: "Hành động",
      dataIndex: "index",
      key: "action",
      render: (key: number) => {
        return (
          <div className="flex gap-4 items-center  justify-start">
            <CiEdit
              className="text-[#416dea] cursor-pointer"
              onClick={() => navigate(routers.admin.menuUpdate + "?id=" + key)}
            />
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa ?"
              onConfirm={() => handleDelete(key)}
              okText="Có"
              cancelText="Không"
            >
              <FaRegTrashAlt className="text-[#f82222] cursor-pointer" />
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <AppTable
        columns={columns}
        dataSource={listMenus ?? []}
        loading={isLoading}
      />
    </div>
  );
};

export default TableMenuProduct;

import { useNavigate, useParams } from "react-router-dom";
import TableMenuProduct from "../../../components/admin/table/menu-product/TableMenuProduct";
import { PageCRUD } from "../../../types/enum";
import { Button } from "antd";
import { FaPlus } from "react-icons/fa6";
import { routers } from "../../../routes";
import MenuProductCrud from "../../../components/admin/PageCrud/product/menu-product-crud";

const MenuProduct = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  return (
    <div>
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
              onClick={() => navigate(routers.admin.menuCreate)}
            >
              Thêm mới
            </Button>
          </div>
          <TableMenuProduct />
        </>
      ) : type === PageCRUD.UPDATE || type === PageCRUD.CREATE ? (
        <MenuProductCrud type={type + ""} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MenuProduct;

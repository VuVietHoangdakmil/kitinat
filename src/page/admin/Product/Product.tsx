import TableProduct from "../../../components/admin/table/product";
import ProductCrud from "../../../components/admin/PageCrud/product";
import { useParams, useNavigate } from "react-router-dom";
import { PageCRUD } from "../../../types/enum";
import { FaPlus } from "react-icons/fa";

import { Button } from "antd";
import { routers } from "../../../routes";

const Product = () => {
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
              onClick={() => navigate(routers.admin.productCreate)}
            >
              Thêm mới
            </Button>
          </div>
          <TableProduct />
        </>
      ) : type === PageCRUD.UPDATE || type === PageCRUD.CREATE ? (
        <ProductCrud type={type + ""} />
      ) : (
        <div></div>
      )}
    </>
  );
};
export default Product;

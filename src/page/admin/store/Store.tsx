import TableStore from "../../../components/admin/table/store";
import StoreCrud from "../../../components/admin/PageCrud/store";
import { useParams, useNavigate } from "react-router-dom";
import { PageCRUD } from "../../../types/enum";
import { FaPlus } from "react-icons/fa";

import { Button } from "antd";
import { routers } from "../../../routes";

const Store = () => {
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
              onClick={() => navigate(routers.admin.storeCreate)}
            >
              Thêm mới
            </Button>
          </div>
          <TableStore />
        </>
      ) : type === PageCRUD.UPDATE || type === PageCRUD.CREATE ? (
        <StoreCrud type={type + ""} />
      ) : (
        <div></div>
      )}
    </>
  );
};
export default Store;

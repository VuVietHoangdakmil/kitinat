import { Button, Card, Col, Form, List, Modal, Row, Typography } from "antd";
import { useRef } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import EditorCustom from "../../../components/admin/EditorCustom";
import AppInput from "../../../components/shared/app-input";
import AppLoading from "../../../components/shared/app-loading";
import { useLoading } from "../../../hook/helpers/useLoading";
import { usePagination } from "../../../hook/helpers/usePagination.hook";
import {
  createCategory,
  deleteCategory,
  getListCategories,
} from "../../../services/category.service";
import {
  StoreCategory,
  StoreCreateCategory,
} from "../../../types/data/category";
import {
  notifyError,
  notifySuccess,
} from "../../../utils/helper/notify.helper";

const Category = () => {
  const refContent = useRef<any>();
  const handleDelete = (key: string) => {
    Modal.confirm({
      title: "Bạn có muốn xóa danh mục này không?",

      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk: async () => {
        try {
          await deleteCategory(key);
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
  const [form] = Form.useForm();
  const { isLoading: isLoadingForm, startLoading, stopLoading } = useLoading();

  const descriptionValue = Form.useWatch("description", form);

  // const navigate = useNavigate();
  const {
    data: listCategories,
    isLoading,
    refresh,
  } = usePagination("list-categories", {}, getListCategories);
  const handleFinish = async (value: StoreCreateCategory) => {
    startLoading();
    try {
      const valueContent = refContent?.current?.getContent();

      await createCategory({
        ...value,
        description: valueContent,
      });
      refresh();
      form.resetFields();
      notifySuccess("Thêm mới thành công");
    } catch (error: any) {
      notifyError(error.response.data.message);
    } finally {
      stopLoading();
    }
  };

  return (
    <div>
      {(isLoading || isLoadingForm) && <AppLoading />}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card className="shadow-lg">
            <Form layout="vertical" form={form} onFinish={handleFinish}>
              <AppInput label="Tên danh mục" name="name" />
              <Form.Item name="description" label="Mô tả">
                <EditorCustom
                  ref={refContent}
                  initialValue={descriptionValue}
                  height={400}
                  nameForm={["description"]}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            className="shadow-lg"
            title={
              <Typography.Title level={4}>Danh mục sản phẩm</Typography.Title>
            }
          >
            <List
              dataSource={listCategories ?? []}
              renderItem={(item: StoreCategory) => (
                <div className="rounded-2xl p-8 shadow-lg bg-white flex justify-between items-center">
                  <Typography.Text>{item.name}</Typography.Text>
                  <FaRegTrashAlt
                    className="cursor-pointer text-red-500"
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              )}
              loading={isLoading}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Category;

import { Col, Form, Row } from "antd";
import React, { useEffect } from "react";
import AppInput from "../../../../../shared/app-input";
import { IoIosRemoveCircle } from "react-icons/io";

import { formatNumberPrice } from "../../../../../../utils/const";
type Props = {
  variant: any;
  onUpdateVariant: (value: any) => void;
  onRemove: () => void;
};
const ItemVariant: React.FC<Props> = ({
  onUpdateVariant,
  variant,
  onRemove,
}) => {
  const [form] = Form.useForm();
  const handleSubmit = async (value: any) => {
    try {
      onUpdateVariant(value);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {}, [JSON.stringify(variant)]);

  return (
    <div className="relative p-4">
      <Form
        form={form}
        component={false}
        initialValues={variant}
        onFinish={handleSubmit}
      >
        <Row gutter={[8, 8]} className="rounded-lg p-4 shadow-lg">
          <Col span={12}>
            <AppInput
              name="size"
              label="Kích thước"
              rules={[{ required: true, message: "Vui lòng nhập tên" }]}
              onBlur={() => form.submit()}
            />
          </Col>
          <Col span={12}>
            <AppInput
              typeInput="number"
              name={"price"}
              label="Giá"
              rules={[{ required: true, message: "Vui lòng giá " }]}
              onBlur={() => form.submit()}
              {...formatNumberPrice}
            />
          </Col>
        </Row>
      </Form>
      <IoIosRemoveCircle
        size={26}
        className="text-danger-color absolute cursor-pointer top-0 right-0"
        onClick={onRemove}
      />
    </div>
  );
};

export default ItemVariant;

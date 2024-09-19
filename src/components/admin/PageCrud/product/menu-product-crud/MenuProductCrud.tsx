import {
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  Row,
  Select,
  Upload,
  UploadProps,
} from "antd";
import { getBase64 } from "../../../../../utils/helper/file.helper";
import { RcFile, UploadFile } from "antd/es/upload";
import { useState } from "react";
import { FaUpload } from "react-icons/fa6";
import _ from "lodash";
import { uploadManyFiles } from "../../../../../services/upload.service";
import { createMenu } from "../../../../../services/product.service";
import {
  notifyError,
  notifySuccess,
} from "../../../../../utils/helper/notify.helper";
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const props: UploadProps = {
  name: "file",
  multiple: true,

  onChange(info) {
    const { status } = info.file;

    if (status === "done") {
      // message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      // message.error(`${info.file.name} file upload failed.`);
    }
  },
  beforeUpload(file) {
    console.log(file);
    // Prevent the upload
    return false;
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
type Props = {
  type: string;
};
const MenuProductCrud: React.FC<Props> = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const handleChange: UploadProps["onChange"] = async (info) => {
    const url = await getBase64(info.file as RcFile);
    setImageUrl(url);
  };
  const handleFinish = async (value: any) => {
    try {
      const { file, ...valueForm } = value;
      const fmData = new FormData();
      let responseImage = [];
      const imageUrls: string[] = [];
      if (!_.isEmpty(file)) {
        file?.forEach((file: UploadFile) => {
          const fileOrigin = file.originFileObj;
          console.log(file);
          if (fileOrigin) fmData.append("images", fileOrigin);
          if (_.isString(file)) {
            imageUrls.push(file);
          }
        });
        // Check if FormData is not empty before making the API call
        if (fmData.has("images")) {
          const res = await uploadManyFiles(fmData);
          responseImage = res.images;
        }
        await createMenu({
          ...valueForm,
          image: responseImage?.[0],
        });
        form.resetFields();
        setImageUrl("");
      }
      notifySuccess("Thêm thành công");
    } catch (error: any) {
      console.log(error);
      notifyError(error.response.data.message);
    }
  };
  return (
    <div>
      <Card className="shadow-lg">
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item name="index" label="Số trang">
                <InputNumber className="w-full" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="type" label="Loại">
                <Select
                  className="w-full"
                  options={[
                    {
                      label: "Ảnh",
                      value: "image",
                    },
                    {
                      label: "File",
                      value: "file",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Hình ảnh"
                valuePropName="fileList"
                name="file"
                getValueFromEvent={normFile}
              >
                <Upload
                  {...props}
                  name="avatar"
                  className="avatar-uploader"
                  showUploadList={false}
                  listType="picture-card"
                  maxCount={1}
                  onChange={handleChange}
                >
                  {imageUrl ? ( // Display the image if available
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      className="w-[10rem] h-[10rem] rounded-lg border"
                    />
                  ) : (
                    <Button
                      style={{ border: 0, background: "none" }}
                      className=" h-full w-full border "
                    >
                      <FaUpload />
                      <div style={{ marginTop: 8 }}>Tải lên</div>
                    </Button>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default MenuProductCrud;

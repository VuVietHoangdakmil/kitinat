import {
  Form,
  Input,
  Collapse,
  Upload,
  Button,
  FormProps,
  message,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";
import "./index.css";
import { FaRegSave } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import Config from "../../../provider/ConfigAntdTheme/ConfigProvide";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Info as FieldType } from "../../../../types/data/info";
import { firebaseService } from "../../../../service/crudFireBase";
import { KEY } from "../../../../types/enum";
import { useInfo } from "../../../../components/provider/InfoProvider";
interface Field extends Omit<FieldType, "logo"> {
  logo: File | string;
}

const Product: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);
  const { setInfo } = useInfo();
  const { upLoad, getById, update } = firebaseService;
  const [form] = Form.useForm();
  const uploadImgURL = Form.useWatch("logo", form);

  const navigate = useNavigate();
  const onFinish: FormProps<Field>["onFinish"] = (values) => {
    handleUpdate(values);
  };
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Cập nhật thành công",
    });
  };
  const handleUpdate = async (inputUpdate: Field) => {
    setLoading(true);
    try {
      if (!KEY.KEY_INFO) throw new Error("No info ID provided");

      let imageUrl: string | undefined = "";
      if (inputUpdate?.logo instanceof File) {
        imageUrl = await upLoad(inputUpdate.logo, "info");
      } else if (typeof inputUpdate.logo === "string") {
        imageUrl = undefined;
      }

      const blogData: any = {
        ...inputUpdate,
        logo: imageUrl,
      };

      for (const key in blogData) {
        if (blogData[key] === undefined || blogData[key] === null) {
          delete blogData[key];
        }
      }

      await update<Field>("info", KEY.KEY_INFO, blogData);
      success();
      setInfo(blogData);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
    setLoading(false);
  };

  const fetchProductDetails = async (infoId: string) => {
    setLoadingFetch(true);
    try {
      const infoData = await getById<FieldType>("info", infoId);
      if (infoData) {
        form.setFieldsValue(infoData);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching product details: ", error);
    }
    setLoadingFetch(false);
  };
  const onFinishFailed: FormProps<Field>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const normFile = (e: any) => {
    console.log(e);
    return e?.fileList[0].originFileObj;
  };

  useEffect(() => {
    fetchProductDetails(KEY.KEY_INFO);
  }, []);

  return (
    <>
      {contextHolder}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          icon={<FaRegSave />}
          type="primary"
          style={{
            height: "40px",
            margin: "0 0 10px 0",
          }}
          onClick={() => form.submit()}
          loading={loading}
        >
          Lưu
        </Button>
        <Config primaryColor="#1677ff">
          <Button
            icon={<IoReturnUpBackOutline />}
            type="primary"
            style={{
              height: "40px",
              margin: "0 0 10px 20px",
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            Quay lại
          </Button>
        </Config>
      </div>
      <Form
        form={form}
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          overflowY: "auto",
          height: "100vh",
          paddingBottom: "150px",
        }}
      >
        <Collapse
          defaultActiveKey={"1"}
          items={[
            {
              key: "1",
              label: "Thông tin",
              children: (
                <>
                  <Form.Item<FieldType>
                    label="Số điện thoại"
                    name="phoneNumber"
                  >
                    <Input style={{ display: "block" }} />
                  </Form.Item>
                  <Form.Item<FieldType>
                    label="Facebook Link"
                    name="urlFacebook"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item<FieldType> label="Zalo Link" name="urlZalo">
                    <Input />
                  </Form.Item>
                  <Form.Item<FieldType>
                    name="logo"
                    label="Logo"
                    valuePropName="file"
                    getValueFromEvent={normFile}
                  >
                    {loadingFetch || (
                      <Upload
                        defaultFileList={[
                          {
                            uid: "-1",
                            name: "",
                            status: "done",
                            url: uploadImgURL,
                          },
                        ]}
                        name="logo"
                        listType="picture"
                        maxCount={1}
                        beforeUpload={() => false}
                      >
                        <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
                      </Upload>
                    )}
                  </Form.Item>
                </>
              ),
            },
          ]}
        />
      </Form>
    </>
  );
};
export default Product;

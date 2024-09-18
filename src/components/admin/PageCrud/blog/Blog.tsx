import { PageCRUD } from "../../../../types/enum";
import {
  Row,
  Col,
  Form,
  Input,
  Collapse,
  Upload,
  Button,
  FormProps,
} from "antd";
import EditorCustom from "../../EditorCustom";
import { UploadOutlined } from "@ant-design/icons";
import "./index.css";
import { FaRegSave } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import Config from "../../../provider/ConfigAntdTheme/ConfigProvide";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { firebaseService } from "../../../../service/crudFireBase";
type Props = {
  type: string;
};
type FieldType = {
  title?: string;
  summary?: string;
  content?: string;

  img?: File;
  slug?: string;
  metaTitle?: string;
  metaKeyWord?: string;
  metaDescription?: string;
};
const Product: React.FC<Props> = ({ type }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const { upLoad, getById, update, create } = firebaseService;
  const [form] = Form.useForm();

  const contentValue = Form.useWatch("content", form);
  const uploadImgURL = Form.useWatch("img", form);

  const refContent = useRef<any>();

  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const valueContent = refContent?.current?.getContent();

    const productData = {
      ...values,
      content: valueContent,
    };

    if (type === PageCRUD.CREATE) {
      handleAdd(productData);
    } else if (type === PageCRUD.UPDATE) {
      handleUpdate(productData);
    }
  };

  const handleAdd = async (inputAdd: FieldType) => {
    setLoading(true);
    try {
      let imageUrl = "";
      if (inputAdd.img instanceof File) {
        imageUrl = await upLoad(inputAdd.img, "blogs");
      } else if (typeof inputAdd.img === "string") {
        imageUrl = inputAdd.img;
      }

      const BlogsData = {
        ...inputAdd,
        img: imageUrl,
      } as Record<string, any>;

      for (const key in BlogsData) {
        if (BlogsData[key] === undefined || BlogsData[key] === null) {
          delete BlogsData[key];
        }
      }

      await create<FieldType>("blogs", BlogsData);

      navigate(-1);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setLoading(false);
  };

  const handleUpdate = async (inputUpdate: FieldType) => {
    setLoading(true);
    try {
      const BlogsId = searchParams.get("id");
      if (!BlogsId) throw new Error("No Blogs ID provided");

      let imageUrl = "";
      if (inputUpdate.img instanceof File) {
        imageUrl = await upLoad(inputUpdate.img, "blogs");
      } else if (typeof inputUpdate.img === "string") {
        imageUrl = inputUpdate.img;
      }

      const blogData = {
        ...inputUpdate,
        img: imageUrl,
      } as Record<string, any>;

      for (const key in blogData) {
        if (blogData[key] === undefined || blogData[key] === null) {
          delete blogData[key];
        }
      }
      update<FieldType>("blogs", BlogsId, blogData);

      navigate(-1);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
    setLoading(false);
  };

  const fetchProductDetails = async (BlogsId: string) => {
    try {
      const productData = await getById<FieldType>("blogs", BlogsId);
      if (productData) {
        form.setFieldsValue(productData);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching product details: ", error);
    }
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const normFile = (e: any) => {
    return e?.fileList[0].originFileObj;
  };

  useEffect(() => {
    if (type === PageCRUD.UPDATE) {
      fetchProductDetails(searchParams.get("id") || "");
    }
  }, [type, searchParams.get("id")]);
  const propsUpload: any =
    uploadImgURL instanceof File || type === PageCRUD.CREATE
      ? {}
      : {
          fileList: [
            {
              uid: "-1",
              name: "",
              status: "done",
              url: uploadImgURL,
            },
          ],
        };
  return (
    <>
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
        <Row gutter={20}>
          <Col span={16}>
            <Collapse
              defaultActiveKey={"1"}
              items={[
                {
                  key: "1",
                  label: "Thông tin",
                  children: (
                    <>
                      <Form.Item<FieldType> label="Tiêu đề" name="title">
                        <Input style={{ display: "block" }} />
                      </Form.Item>

                      <Form.Item name="summary" label="Tóm tắt">
                        <Input.TextArea style={{ height: "200px" }} />
                      </Form.Item>
                      <Form.Item name="content" label="Nội dung">
                        <EditorCustom
                          ref={refContent}
                          initialValue={contentValue}
                          height={800}
                        />
                      </Form.Item>
                    </>
                  ),
                },
              ]}
            />
          </Col>
          <Col span={8}>
            <Collapse
              defaultActiveKey={"1"}
              items={[
                {
                  key: "1",
                  label: "Hình ảnh",

                  children: (
                    <Form.Item<FieldType>
                      name="img"
                      label="Hình ảnh"
                      valuePropName="file"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        name="logo"
                        listType="picture"
                        maxCount={1}
                        beforeUpload={() => false}
                        onChange={(d) => {
                          console.log("d", d);
                        }}
                        {...propsUpload}
                      >
                        <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
                      </Upload>
                    </Form.Item>
                  ),
                },
              ]}
            />
            <Collapse
              style={{ marginTop: "10px" }}
              defaultActiveKey={"1"}
              items={[
                {
                  key: "1",
                  label: "SEO",
                  children: (
                    <>
                      <Form.Item<FieldType> label="Slug" name="slug">
                        <Input style={{}} />
                      </Form.Item>
                      <Form.Item<FieldType> label="Meta title" name="metaTitle">
                        <Input style={{}} />
                      </Form.Item>
                      <Form.Item<FieldType>
                        label="Meta Keyword"
                        name="metaKeyWord"
                      >
                        <Input style={{}} />
                      </Form.Item>
                      <Form.Item<FieldType>
                        label="Meta Description"
                        name="metaDescription"
                      >
                        <Input.TextArea style={{ height: "150px" }} />
                      </Form.Item>
                    </>
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <></>
      </Form>
    </>
  );
};
export default Product;

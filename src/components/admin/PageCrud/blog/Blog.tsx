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
  message,
} from "antd";
import EditorCustom from "../../EditorCustom";
import { UploadOutlined } from "@ant-design/icons";
import "./index.css";
import { FaRegSave } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import Config from "../../../provider/ConfigAntdTheme/ConfigProvide";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { uploadManyFiles } from "../../../../services/upload.service";
import {
  createBlog,
  getBlogById,
  updateBlog,
} from "../../../../services/blog.service";

import { BlogBody, Blog } from "../../../../types/data/blogs";
type Props = {
  type: string;
};
type FieldType = {
  title?: string;
  summary?: string;
  content?: string;

  img?: File | string;
  slug?: string;
  metaTitle?: string;
  metaKeyWord?: string;
  metaDescription?: string;
};

const Product: React.FC<Props> = ({ type }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const error = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };
  const contentValue = Form.useWatch("content", form);
  const uploadImgURL = Form.useWatch("img", form);

  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const productData = {
      ...values,
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
      let imageUrl = { src: "" };
      if (inputAdd.img instanceof File) {
        const formData = new FormData();
        formData.append("images", inputAdd.img);
        if (formData.has("images")) {
          const resFile = await uploadManyFiles(formData);

          imageUrl = { src: resFile.images[0] };
        }
      } else {
        imageUrl = { src: inputAdd?.img?.src ?? "" };
      }

      const body: BlogBody = {
        img: imageUrl,
        title: inputAdd.title ?? "",
        summary: inputAdd.summary ?? "",
        content: inputAdd.content ?? "",
        seo: {
          slug: inputAdd.slug ?? "",
          meta_title: inputAdd.metaTitle ?? "",
          meta_keyword: inputAdd.metaKeyWord ?? "",
          meta_description: inputAdd.metaDescription ?? "",
        },
      };
      const res = await createBlog(body);
      console.log("res", res);

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
        const formData = new FormData();
        formData.append("images", inputUpdate.img);
        if (formData.has("images")) {
          const resFile = await uploadManyFiles(formData);

          imageUrl = resFile.images[0];
        }
      } else {
        imageUrl = inputUpdate?.img ?? "";
      }

      const body: BlogBody = {
        img: imageUrl,
        title: inputUpdate.title ?? "",
        summary: inputUpdate.summary ?? "",
        content: inputUpdate.content ?? "",
        seo: {
          slug: inputUpdate.slug ?? "",
          meta_title: inputUpdate.metaTitle ?? "",
          meta_keyword: inputUpdate.metaKeyWord ?? "",
          meta_description: inputUpdate.metaDescription ?? "",
        },
      };
      const res = (await updateBlog(Number(BlogsId), body)) as any;
      if (res?.type === "error") {
        error(res?.message?.seo?.slug[0] + "");
      } else {
        navigate(-1);
      }
    } catch (error) {
      console.error("Error updating docádasdasdasdasdument: ", error);
    }
    setLoading(false);
  };

  const fetchProductDetails = async (BlogsId: string) => {
    try {
      const res = (await getBlogById(Number(BlogsId))) as any;
      const data: Blog = res;
      if (data) {
        const dataBlog: FieldType = {
          ...data,
          slug: data?.seo?.slug,
          metaTitle: data?.seo?.meta_title,
          metaKeyWord: data?.seo?.meta_keyword,
          metaDescription: data?.seo?.meta_description,
        };
        const dataBlogDataBase: BlogBody = {
          img: data.img ?? "",
          title: data.title ?? "",
          summary: data.summary ?? "",
          content: data.content ?? "",
          seo: {
            slug: data.seo?.slug ?? "",
            meta_title: data.seo?.meta_title ?? "",
            meta_keyword: data.seo?.meta_keyword ?? "",
            meta_description: data.seo?.meta_description ?? "",
          },
        };
        form.setFieldsValue(dataBlog);
        setBlogDatabase(dataBlogDataBase);
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
      fetchProductDetails(searchParams.get("id") ?? "");
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
          height: "80vh",
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
                      <Form.Item<FieldType>
                        label="Tiêu đề"
                        name="title"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tiêu đề",
                          },
                        ]}
                      >
                        <Input style={{ display: "block" }} />
                      </Form.Item>

                      <Form.Item
                        name="summary"
                        label="Tóm tắt"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tóm tắt",
                          },
                        ]}
                      >
                        <Input.TextArea style={{ height: "200px" }} />
                      </Form.Item>
                      <Form.Item
                        name="content"
                        label="Nội dung"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập nội dung",
                          },
                        ]}
                      >
                        <EditorCustom
                          initialValue={contentValue}
                          height={800}
                          nameForm={["content"]}
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
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn hình ảnh",
                          type:
                            uploadImgURL instanceof File ? "object" : "string",
                        },
                      ]}
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
                      <Form.Item<FieldType>
                        label="Slug"
                        name="slug"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập slug",
                          },
                        ]}
                      >
                        <Input style={{}} />
                      </Form.Item>
                      <Form.Item<FieldType>
                        label="Meta title"
                        name="metaTitle"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập meta title",
                          },
                        ]}
                      >
                        <Input style={{}} />
                      </Form.Item>
                      <Form.Item<FieldType>
                        label="Meta Keyword"
                        name="metaKeyWord"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập meta keyword",
                          },
                        ]}
                      >
                        <Input style={{}} />
                      </Form.Item>
                      <Form.Item<FieldType>
                        label="Meta Description"
                        name="metaDescription"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập meta description",
                          },
                        ]}
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

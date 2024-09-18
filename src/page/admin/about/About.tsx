import { Form, Collapse, Button, FormProps } from "antd";
import EditorCustom from "../../../components/admin/EditorCustom";

import { FaRegSave } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import Config from "../../../components/provider/ConfigAntdTheme/ConfigProvide";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FieldType = {
  contentAbout: string;
};
const Product: React.FC = () => {
  //   const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);

  const [form] = Form.useForm();

  const contentValue = Form.useWatch("contentAbout", form);
  //   const uploadImgURL = Form.useWatch("img", form);

  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("values", values);
  };

  //   const handleAdd = async (inputAdd: FieldType) => {
  //     setLoading(true);
  //     try {
  //       let imageUrl = "";
  //       if (inputAdd.img instanceof File) {
  //         const formData = new FormData();
  //         formData.append("images", inputAdd.img);
  //         if (formData.has("images")) {
  //           const resFile = await uploadManyFiles(formData);

  //           imageUrl = resFile.images[0];
  //         }
  //       } else {
  //         imageUrl = inputAdd?.img ?? "";
  //       }

  //       const body: BlogBody = {
  //         img: imageUrl,
  //         title: inputAdd.title ?? "",
  //         summary: inputAdd.summary ?? "",
  //         content: inputAdd.content ?? "",
  //         seo: {
  //           slug: inputAdd.slug ?? "",
  //           meta_title: inputAdd.metaTitle ?? "",
  //           meta_keyword: inputAdd.metaKeyWord ?? "",
  //           meta_description: inputAdd.metaDescription ?? "",
  //         },
  //       };
  //       const res = await createBlog(body);
  //       console.log("res", res);

  //       navigate(-1);
  //     } catch (error) {
  //       console.error("Error adding document: ", error);
  //     }
  //     setLoading(false);
  //   };

  //   const handleUpdate = async (inputUpdate: FieldType) => {
  //     setLoading(true);
  //     try {
  //       const BlogsId = searchParams.get("id");
  //       if (!BlogsId) throw new Error("No Blogs ID provided");

  //       let imageUrl = "";
  //       if (inputUpdate.img instanceof File) {
  //         const formData = new FormData();
  //         formData.append("images", inputUpdate.img);
  //         if (formData.has("images")) {
  //           const resFile = await uploadManyFiles(formData);

  //           imageUrl = resFile.images[0];
  //         }
  //       } else {
  //         imageUrl = inputUpdate?.img ?? "";
  //       }

  //       const body: BlogBody = {
  //         img: imageUrl,
  //         title: inputUpdate.title ?? "",
  //         summary: inputUpdate.summary ?? "",
  //         content: inputUpdate.content ?? "",
  //         seo: {
  //           slug: inputUpdate.slug ?? "",
  //           meta_title: inputUpdate.metaTitle ?? "",
  //           meta_keyword: inputUpdate.metaKeyWord ?? "",
  //           meta_description: inputUpdate.metaDescription ?? "",
  //         },
  //       };

  //       // for (const key in blogData) {
  //       //   if (blogData[key] === undefined || blogData[key] === null) {
  //       //     delete blogData[key];
  //       //   }
  //       // }
  //       // update<FieldType>("blogs", BlogsId, blogData);
  //       const res = await updateBlog(Number(BlogsId), body);
  //       console.log("res", res);

  //       navigate(-1);
  //     } catch (error) {
  //       console.error("Error updating document: ", error);
  //     }
  //     setLoading(false);
  //   };

  //   const fetchProductDetails = async (BlogsId: string) => {
  //     try {
  //       // const productData = await getById<FieldType>("blogs", BlogsId);
  //       const res = await getBlogById(Number(BlogsId));
  //       console.log("res", res);
  //       // if (productData) {
  //       //   // form.setFieldsValue(productData);
  //       // } else {
  //       //   console.log("No such document!");
  //       // }
  //     } catch (error) {
  //       console.error("Error fetching product details: ", error);
  //     }
  //   };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  //   useEffect(() => {
  //     if (type === PageCRUD.UPDATE) {
  //       fetchProductDetails(searchParams.get("id") || "");
  //     }
  //   }, [type, searchParams.get("id")]);

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
          height: "80vh",
          paddingBottom: "150px",
        }}
      >
        <Collapse
          defaultActiveKey={"1"}
          items={[
            {
              key: "1",
              label: "Về chúng tôi",
              children: (
                <Form.Item<FieldType>
                  name="contentAbout"
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
                    height={1000}
                    nameForm={["contentAbout"]}
                  />
                </Form.Item>
              ),
            },
          ]}
        />
      </Form>
    </>
  );
};
export default Product;

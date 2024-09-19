import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Form,
  FormProps,
  Input,
  Row,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { UploadFile } from "antd/es/upload";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import { db } from "../../../../firebase";
import {
  createProduct,
  getProductDetail,
} from "../../../../services/product.service";
import { uploadManyFiles } from "../../../../services/upload.service";
import { PageCRUD } from "../../../../types/enum";
import { formatNumberPrice } from "../../../../utils/const";
import {
  notifyError,
  notifySuccess,
} from "../../../../utils/helper/notify.helper";
import Config from "../../../provider/ConfigAntdTheme/ConfigProvide";
import AppInput from "../../../shared/app-input";
import EditorCustom from "../../EditorCustom";
import VariantsProduct from "./components/variants-product/VariantsProduct";
import "./index.css";
type Props = {
  type: string;
};
type FieldType = {
  title?: string;
  price?: number;
  priceDisCount?: number;
  urlViewUser?: string;
  summary?: string;
  content?: string;
  view?: number;
  id?: string;
  uploadImg?: File;
  slug?: string;
  metaTitle?: string;
  metaKeyWord?: string;
  metaDescription?: string;
};

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
const Product: React.FC<Props> = ({ type }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);

  console.log("d", setSearchParams);
  const [form] = Form.useForm();
  const summaryValue = Form.useWatch("summary", form);
  const contentValue = Form.useWatch("content", form);
  const uploadImgURL = Form.useWatch("file", form);
  console.log(summaryValue);

  const refSummary = useRef<any>();
  const refContent = useRef<any>();
  const dataCollectionRef = collection(db, "products");
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
    try {
      const valueSummary = refSummary?.current?.getContent();
      const valueContent = refContent?.current?.getContent();
      console.log(values);
      const { name, description, variants, file } = values;

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
      }
      console.log(name, description, variants);
      await createProduct({
        name,
        description: valueContent,
        variants,
        image: responseImage?.[0],
      });
      form.resetFields();
      notifySuccess("Thêm thành công");
      return;
      const productData = {
        ...values,
        content: valueContent,
        summary: valueSummary,
      };

      if (type === PageCRUD.CREATE) {
        handleAdd(productData);
      } else if (type === PageCRUD.UPDATE) {
        handleUpdate(productData);
      }
    } catch (error: any) {
      notifyError(error.response.data.message);
    }
  };

  const handleAdd = async (inputAdd: FieldType) => {
    setLoading(true);
    try {
      let imageUrl = "";
      if (inputAdd.uploadImg instanceof File) {
        const storage = getStorage();
        const imageRef = ref(storage, `products/${inputAdd.uploadImg.name}`);

        await uploadBytes(imageRef, inputAdd.uploadImg);
        imageUrl = await getDownloadURL(imageRef);
      } else if (typeof inputAdd.uploadImg === "string") {
        imageUrl = inputAdd.uploadImg;
      }

      const productData = {
        ...inputAdd,
        uploadImg: imageUrl,
      } as Record<string, any>;

      for (const key in productData) {
        if (productData[key] === undefined || productData[key] === null) {
          delete productData[key];
        }
      }
      console.log("productData", productData);
      const docRef = await addDoc(dataCollectionRef, productData);
      console.log("Document written with ID: ", docRef.id);
      navigate(-1);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setLoading(false);
  };

  const handleUpdate = async (inputUpdate: FieldType) => {
    setLoading(true);
    try {
      const productId = searchParams.get("id");
      if (!productId) throw new Error("No product ID provided");

      let imageUrl = "";
      if (inputUpdate.uploadImg instanceof File) {
        const storage = getStorage();
        const imageRef = ref(storage, `products/${inputUpdate.uploadImg.name}`);
        await uploadBytes(imageRef, inputUpdate.uploadImg);
        imageUrl = await getDownloadURL(imageRef);
      } else if (typeof inputUpdate.uploadImg === "string") {
        imageUrl = inputUpdate.uploadImg;
      }

      const productData = {
        ...inputUpdate,
        uploadImg: imageUrl,
      } as Record<string, any>;

      for (const key in productData) {
        if (productData[key] === undefined || productData[key] === null) {
          delete productData[key];
        }
      }

      const docRef = doc(db, "products", productId);
      await updateDoc(docRef, productData);
      console.log("Document updated with ID: ", productId);
      navigate(-1);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
    setLoading(false);
  };

  // const fetchProductDetails = async (productId: string) => {
  //   try {
  //     const docRef = doc(db, "products", productId);
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       const productData = docSnap.data() as FieldType;

  //       form.setFieldsValue(productData);
  //     } else {
  //       console.log("No such document!");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching product details: ", error);
  //   }
  // };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (type === PageCRUD.UPDATE) {
        // fetchProductDetails(searchParams.get("id") || "");
        try {
          if (type === PageCRUD.UPDATE) {
            // fetchProductDetails(searchParams.get("id") || "");
            const productDetail = (await getProductDetail(
              searchParams.get("id") || ""
            )) as any;
            if (productDetail) {
              form.setFieldsValue(productDetail);
              form.setFieldValue("file", productDetail.image);
            }
          }
        } catch (error: any) {
          notifyError(error.response.message.data);
        }
      }
    };
    fetchProduct();
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
                  label: (
                    <Typography.Text className="font-semibold">
                      Thông tin
                    </Typography.Text>
                  ),
                  children: (
                    <>
                      <Form.Item label="Tên" name="name">
                        <Input style={{ display: "block" }} />
                      </Form.Item>

                      {/* <Form.Item name="summary" label="Tóm tắt">
                        <EditorCustom
                          initialValue={summaryValue}
                          ref={refSummary}
                          height={600}
                        />
                      </Form.Item> */}
                      {/* <Form.Item name="content" label="Nội dung">
                        <EditorCustom
                          ref={refContent}
                          initialValue={contentValue}
                          height={800}
                        />
                      </Form.Item> */}
                      <Form.Item name="description" label="Mô tả">
                        <EditorCustom
                          ref={refContent}
                          initialValue={contentValue}
                          height={400}
                        />
                      </Form.Item>
                      <Form.Item
                        name="file"
                        label="Hình ảnh"
                        valuePropName="file"
                        getValueFromEvent={normFile}
                      >
                        <Upload
                          {...props}
                          name="logo"
                          listType="picture"
                          maxCount={1}
                          beforeUpload={() => false}
                          onChange={(d) => {
                            console.log("d", d);
                          }}
                          {...propsUpload}
                        >
                          <Button icon={<UploadOutlined />}>
                            Chọn hình ảnh
                          </Button>
                        </Upload>
                      </Form.Item>
                    </>
                  ),
                },
              ]}
              bordered={false}
              expandIconPosition="end"
              className="shadow-lg bg-white"
            />
            <Collapse
              style={{ marginTop: "10px" }}
              defaultActiveKey={"1"}
              bordered={false}
              expandIconPosition="end"
              className="shadow-lg bg-white"
              items={[
                {
                  key: "1",
                  label: (
                    <Typography.Text className="font-semibold">
                      Thuộc tính sản phẩm
                    </Typography.Text>
                  ),
                  children: (
                    <Form.Item name="variants">
                      <VariantsProduct />
                    </Form.Item>
                  ),
                },
              ]}
            />
            {/* <Collapse
              style={{ marginTop: "10px" }}
              defaultActiveKey={"1"}
              bordered={false}
              expandIconPosition="end"
              className="shadow-lg bg-white"
              items={[
                {
                  key: "1",
                  label: (
                    <Typography.Text className="font-semibold">
                      Lượt xem tùy chỉnh
                    </Typography.Text>
                  ),
                  children: (
                    <Form.Item<FieldType> label="Lượt xem sản phẩm" name="view">
                      <Input style={{ display: "block" }} />
                    </Form.Item>
                  ),
                },
              ]}
            /> */}
          </Col>
          <Col span={8}>
            <Collapse
              defaultActiveKey={"1"}
              bordered={false}
              expandIconPosition="end"
              className="shadow-lg bg-white"
              items={[
                {
                  key: "1",
                  label: (
                    <Typography.Text className="font-semibold">
                      Phân loại
                    </Typography.Text>
                  ),
                  children: (
                    <>
                      <Form.Item<FieldType> label="Mã sản phẩm" name="id">
                        <Input style={{}} />
                      </Form.Item>
                      <Form.Item label="Tìm kiếm danh mục">
                        <Input style={{}} />
                      </Form.Item>
                    </>
                  ),
                },
              ]}
            />
            <Collapse
              style={{ marginTop: "10px" }}
              defaultActiveKey={"1"}
              bordered={false}
              expandIconPosition="end"
              className="shadow-lg bg-white"
              items={[
                {
                  key: "1",
                  label: (
                    <Typography.Text className="font-semibold">
                      Thông tin giá
                    </Typography.Text>
                  ),
                  children: (
                    <>
                      <AppInput
                        label="Giá"
                        name="price"
                        {...(formatNumberPrice as any)}
                      />

                      <Form.Item<FieldType>
                        label="Giá khuyến mãi"
                        name="priceDisCount"
                      >
                        <Input style={{}} />
                      </Form.Item>
                    </>
                  ),
                },
              ]}
            />
            <Collapse
              style={{ marginTop: "10px" }}
              defaultActiveKey={"1"}
              bordered={false}
              expandIconPosition="end"
              className="shadow-lg bg-white"
              items={[
                {
                  key: "1",
                  label: (
                    <Typography.Text className="font-semibold">
                      Hình ảnh
                    </Typography.Text>
                  ),

                  children: (
                    <Form.Item
                      name="uploadImg"
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
              bordered={false}
              expandIconPosition="end"
              className="shadow-lg bg-white"
              items={[
                {
                  key: "1",
                  label: <Typography.Text>SEO</Typography.Text>,
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

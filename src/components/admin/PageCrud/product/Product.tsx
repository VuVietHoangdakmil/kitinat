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
  Typography,
  InputNumber,
} from "antd";
import EditorCustom from "../../EditorCustom";
import { UploadOutlined } from "@ant-design/icons";
import "./index.css";
import { FaRegSave } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import Config from "../../../provider/ConfigAntdTheme/ConfigProvide";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { db } from "../../../../firebase";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { formatNumberPrice } from "../../../../utils/const";
import AppInput from "../../../shared/app-input";
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
const Product: React.FC<Props> = ({ type }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  console.log("d", setSearchParams);
  const [form] = Form.useForm();
  const summaryValue = Form.useWatch("summary", form);
  const contentValue = Form.useWatch("content", form);
  const uploadImgURL = Form.useWatch("uploadImg", form);

  const refSummary = useRef<any>();
  const refContent = useRef<any>();
  const dataCollectionRef = collection(db, "products");
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const valueSummary = refSummary?.current?.getContent();
    const valueContent = refContent?.current?.getContent();
    console.log(valueSummary);
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

  const fetchProductDetails = async (productId: string) => {
    try {
      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const productData = docSnap.data() as FieldType;

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
                  label: (
                    <Typography.Text className="font-semibold">
                      Thông tin
                    </Typography.Text>
                  ),
                  children: (
                    <>
                      <Form.Item<FieldType> label="Tiêu đề" name="title">
                        <Input style={{ display: "block" }} />
                      </Form.Item>

                      <Form.Item name="summary" label="Tóm tắt">
                        <EditorCustom
                          initialValue={summaryValue}
                          ref={refSummary}
                          height={600}
                        />
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
            />
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

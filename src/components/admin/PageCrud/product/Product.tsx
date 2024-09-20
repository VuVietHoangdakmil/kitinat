import {
  Button,
  Col,
  Collapse,
  Form,
  FormProps,
  Input,
  Row,
  Select,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { RcFile, UploadFile } from "antd/es/upload";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { FaRegSave, FaUpload } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { useLoading } from "../../../../hook/helpers/useLoading";
import { usePagination } from "../../../../hook/helpers/usePagination.hook";
import { getListCategories } from "../../../../services/category.service";
import {
  createProduct,
  getProductDetail,
  updateProduct,
} from "../../../../services/product.service";
import { uploadManyFiles } from "../../../../services/upload.service";
import { StoreCategory } from "../../../../types/data/category";
import { StoreProduct } from "../../../../types/data/product";
import { getBase64 } from "../../../../utils/helper/file.helper";
import {
  notifyError,
  notifySuccess,
} from "../../../../utils/helper/notify.helper";
import Config from "../../../provider/ConfigAntdTheme/ConfigProvide";
import AppLoading from "../../../shared/app-loading";
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
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [imageUrl, setImageUrl] = useState("");
  const { data: listCategories } = usePagination(
    "list-categories",
    {},
    getListCategories
  );
  console.log("d", setSearchParams);
  const id = searchParams.get("id") || "";
  const { data: productDetail, isLoading: isLoadingDetail } =
    useSWR<StoreProduct>(id ? `product-detail-${id}` : null, () =>
      getProductDetail(id)
    );
  console.log(productDetail);

  const [form] = Form.useForm();
  const descriptionValue = Form.useWatch("description", form);

  const refContent = useRef<any>();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
    startLoading();
    try {
      const valueContent = refContent?.current?.getContent();
      const { name, variants, file } = values;

      const fmData = new FormData();
      let responseImage = productDetail ? [productDetail.image] : [];
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
      if (id) {
        await updateProduct(id, {
          name,
          description: valueContent,
          variants,
          image: responseImage?.[0],
        });
        notifySuccess("Cập nhật thành công");
        return;
      }
      await createProduct({
        name,
        description: valueContent,
        variants,
        image: responseImage?.[0],
      });
      form.resetFields();
      setImageUrl("");
      notifySuccess("Thêm thành công");
    } catch (error: any) {
      console.log(error);
      notifyError(error.response.data.message);
    } finally {
      stopLoading();
    }
  };
  const handleChange: UploadProps["onChange"] = async (info) => {
    const url = await getBase64(info.file as RcFile);
    setImageUrl(url);
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
    console.log(productDetail);
    if (productDetail) {
      form.setFieldsValue(productDetail);
      console.log(productDetail.image);
      setImageUrl(productDetail.image);
      form.setFieldValue("file", [productDetail.image]);
    }
  }, [type, JSON.stringify(productDetail)]);

  return (
    <>
      {(isLoading || isLoadingDetail) && <AppLoading />}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          icon={<FaRegSave />}
          type="primary"
          style={{
            height: "40px",
            margin: "0 0 10px 0",
          }}
          onClick={() => form.submit()}
          loading={isLoading}
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
                      <Form.Item
                        label="Tên"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tên",
                          },
                        ]}
                      >
                        <Input style={{ display: "block" }} />
                      </Form.Item>

                      <Form.Item name="description" label="Mô tả">
                        <EditorCustom
                          ref={refContent}
                          initialValue={descriptionValue}
                          height={400}
                          nameForm={["description"]}
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
                      Thuộc tính sản phẩm
                    </Typography.Text>
                  ),
                  children: (
                    <Form.Item
                      name="variants"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập thuộc tính",
                        },
                      ]}
                    >
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
                      <Form.Item label="Tìm kiếm danh mục">
                        <Select
                          style={{}}
                          size="large"
                          options={listCategories?.map(
                            (category: StoreCategory) => ({
                              value: category.id,
                              label: category.name,
                            })
                          )}
                        />
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
                      name="file"
                      label="Hình ảnh"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        {...props}
                        name="logo"
                        maxCount={1}
                        beforeUpload={() => false}
                        showUploadList={false}
                        listType="picture-card"
                        onChange={handleChange}
                        onRemove={(e) => console.log(e)}
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

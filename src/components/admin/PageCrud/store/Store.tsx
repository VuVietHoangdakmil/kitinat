import { PageCRUD } from "../../../../types/enum";
import Map from "../../../map/Map";
import {
  Row,
  Col,
  Form,
  Input,
  Collapse,
  Upload,
  Button,
  FormProps,
  TimePicker,
  message,
} from "antd";
import {
  createStore,
  getStoreById,
  updateStore,
} from "../../../../services/stores.service";
import { uploadManyFiles } from "../../../../services/upload.service";
import { UploadOutlined } from "@ant-design/icons";
import "./index.css";
import { FaRegSave } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import Config from "../../../provider/ConfigAntdTheme/ConfigProvide";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { StoreBody } from "../../../../types/data/store";
import dayjs from "dayjs";
import { Location } from "../../../../components/map/Map";
import _ from "lodash";
type Props = {
  type: string;
};
interface FieldType extends Omit<StoreBody, "images"> {
  images?: File | string;
}

const Product: React.FC<Props> = ({ type }) => {
  const [center, setCenter] = useState<[number, number]>([16.0544, 108.2022]);
  const [messageApi, contextHolder] = message.useMessage();
  const [locations, setLocations] = useState<Location[]>([
    { lat: 21.0285, lng: 105.8542, name: "Hà Nội" },
    { lat: 10.8231, lng: 106.6297, name: "Hồ Chí Minh" },
    { lat: 16.0544, lng: 108.2022, name: "Đà Nẵng" },
  ]);
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Lưu thành công",
    });
  };
  const handleLocationChange = (lat: number, lng: number) => {
    setCenter([lat, lng]);
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);

  const [form] = Form.useForm();

  const handleMapClick = (lat: number, lng: number) => {
    form.setFieldValue("latitude", lat.toFixed(4));
    form.setFieldValue("longitude", lng.toFixed(4));
    setCenter([lat, lng]);
    setLocations((prevLocations) => {
      const newLocations = _.cloneDeep(prevLocations);

      newLocations.pop();
      newLocations.push({
        lat: lat,
        lng: lng,
        name: form.getFieldValue("name"),
      });
      console.log("newLocations2", newLocations);
      return newLocations;
    });
  };

  const uploadImgURL = Form.useWatch("images", form);

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
      if (inputAdd.images instanceof File) {
        const formData = new FormData();
        formData.append("images", inputAdd.images);
        if (formData.has("images")) {
          const resFile = await uploadManyFiles(formData);

          imageUrl = resFile.images[0];
        }
      } else {
        imageUrl = inputAdd?.images ?? "";
      }

      const storeData: StoreBody = {
        name: inputAdd.name,
        address: inputAdd.address,
        phone: inputAdd.phone,
        description: inputAdd.description,
        email: inputAdd.email,
        open_time: dayjs(inputAdd.open_time).format("HH:mm:ss"),
        close_time: dayjs(inputAdd.close_time).format("HH:mm:ss"),
        is_open: inputAdd.is_open,
        images: imageUrl,
        longitude: inputAdd.longitude,
        latitude: inputAdd.latitude,
      };

      await createStore(storeData);

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
      if (inputUpdate.images instanceof File) {
        const formData = new FormData();
        formData.append("images", inputUpdate.images);
        if (formData.has("images")) {
          const resFile = await uploadManyFiles(formData);

          imageUrl = resFile.images[0];
        }
      } else {
        imageUrl = inputUpdate?.images ?? "";
      }

      const storeData: StoreBody = {
        name: inputUpdate.name,
        address: inputUpdate.address,
        phone: inputUpdate.phone,
        description: inputUpdate.description,
        email: inputUpdate.email,
        open_time: dayjs(inputUpdate.open_time).format("HH:mm:ss"),
        close_time: dayjs(inputUpdate.close_time).format("HH:mm:ss"),
        is_open: inputUpdate.is_open,
        images: imageUrl,
        longitude: inputUpdate.longitude,
        latitude: inputUpdate.latitude,
      };

      await updateStore(Number(BlogsId), storeData);
      success();
      // navigate(-1);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
    setLoading(false);
  };

  const fetchProductDetails = async (BlogsId: string) => {
    try {
      const productData = await getStoreById(Number(BlogsId));
      console.log("productData", productData);

      setLocations((prevLocations) => [
        ...prevLocations,
        {
          lat: productData.latitude,
          lng: productData.longitude,
          name: productData.name,
        },
      ]);
      handleLocationChange(productData.latitude, productData.longitude);
      if (productData) {
        form.setFieldsValue({
          ...productData,

          open_time: dayjs(productData.open_time, "HH:mm:ss"),
          close_time: dayjs(productData.close_time, "HH:mm:ss"),
        });
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
      <Row style={{ overflow: "auto", height: "80vh" }} gutter={20}>
        <Col span={16}>
          <Map
            style={{ height: "80vh", width: "100%" }}
            center={center}
            zoom={15}
            onMapClick={handleMapClick}
            locations={locations}
          />
        </Col>

        <Col span={8}>
          <Form
            form={form}
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Collapse
              defaultActiveKey={"1"}
              items={[
                {
                  key: "1",
                  label: "Thông tin",
                  children: (
                    <>
                      <Row gutter={14}>
                        <Col span={12}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: "Longitude không được để trống",
                              },
                            ]}
                            name="longitude"
                            label="Longitude"
                          >
                            <Input
                              disabled
                              style={{ width: "100%", height: "46px" }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: "Latitude không được để trống",
                              },
                            ]}
                            name="latitude"
                            label="Latitude"
                          >
                            <Input
                              disabled
                              style={{ width: "100%", height: "46px" }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item<FieldType>
                        rules={[
                          {
                            required: true,
                            message: "Tên cửa hàng không được để trống",
                          },
                        ]}
                        label="Tên cửa hàng"
                        name="name"
                      >
                        <Input style={{ display: "block" }} />
                      </Form.Item>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Địa chỉ không được để trống",
                          },
                        ]}
                        name="address"
                        label="Địa chỉ"
                      >
                        <Input.TextArea style={{ height: "100px" }} />
                      </Form.Item>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Mô tả không được để trống",
                          },
                        ]}
                        name="description"
                        label="Mô tả"
                      >
                        <Input.TextArea style={{ height: "100px" }} />
                      </Form.Item>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Số điện thoại không được để trống",
                          },
                        ]}
                        name="phone"
                        label="Số điện thoại"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Email không được để trống",
                            type: "email",
                          },
                        ]}
                        name="email"
                        label="Email"
                      >
                        <Input />
                      </Form.Item>
                      <Row gutter={14}>
                        <Col span={12}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: "Giờ mở cửa không được để trống",
                                type: "object",
                              },
                            ]}
                            name="open_time"
                            label="Giờ mở cửa"
                          >
                            <TimePicker
                              style={{ width: "100%", height: "46px" }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: "Giờ đóng cửa không được để trống",
                                type: "object",
                              },
                            ]}
                            name="close_time"
                            label="Giờ đóng cửa"
                          >
                            <TimePicker
                              style={{ width: "100%", height: "46px" }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        rules={[
                          {
                            type:
                              uploadImgURL instanceof File
                                ? "object"
                                : "string",
                            required: true,
                            message: "Hình ảnh không được để trống",
                          },
                        ]}
                        name="images"
                        label="Hình ảnh"
                        valuePropName="file"
                        getValueFromEvent={normFile}
                      >
                        <Upload
                          name="Hình ảnh"
                          listType="picture"
                          maxCount={1}
                          beforeUpload={() => false}
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
            />
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default Product;

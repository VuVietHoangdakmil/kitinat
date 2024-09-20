import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { RcFile, UploadFile } from "antd/es/upload";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa6";
import HTMLFlipBook from "react-pageflip";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { useLoading } from "../../../../../hook/helpers/useLoading";
import { usePagination } from "../../../../../hook/helpers/usePagination.hook";
import {
  createMenu,
  getMenuProduct,
  getMenusProduct,
  updateMenu,
} from "../../../../../services/product.service";
import { uploadManyFiles } from "../../../../../services/upload.service";
import { StoreMenuProduct } from "../../../../../types/data/product";
import { cn } from "../../../../../utils/helper/class.helper";
import { getBase64 } from "../../../../../utils/helper/file.helper";
import {
  notifyError,
  notifySuccess,
} from "../../../../../utils/helper/notify.helper";
import AppInput from "../../../../shared/app-input";
import AppLoading from "../../../../shared/app-loading";
import AppSelect from "../../../../shared/app-select";
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
  const audioRef = useRef<HTMLAudioElement>(null);

  const [imageUrl, setImageUrl] = useState("");
  const { isLoading, stopLoading, startLoading } = useLoading();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const { data: menuDetail } = useSWR<any>(
    id ? `menu-detail-${id}` : null,
    () => getMenuProduct(id),
    { revalidateOnFocus: false }
  );
  const handleChange: UploadProps["onChange"] = async (info) => {
    const url = await getBase64(info.file as RcFile);
    setImageUrl(url);
  };
  const { data: listMenus, refresh } = usePagination(
    "list-menu-product",
    {},
    getMenusProduct
  );
  const handleFinish = async (value: any) => {
    startLoading();
    try {
      const { file, ...valueForm } = value;
      const fmData = new FormData();
      let responseImage = menuDetail ? [menuDetail.image] : [];

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
        await updateMenu(id, {
          ...valueForm,
          image: responseImage?.[0],
        });
        notifySuccess("Cập nhật thành công");
        return;
      }
      await createMenu({
        ...valueForm,
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
      refresh();
    }
  };

  const dataSort = listMenus?.sort(
    (a: StoreMenuProduct, b: StoreMenuProduct) => a.index - b.index
  );

  useEffect(() => {
    if (menuDetail) {
      form.setFieldsValue(menuDetail);
      form.setFieldValue("file", [menuDetail.image]);
      setImageUrl(menuDetail.image);
    }
  }, [JSON.stringify(menuDetail)]);
  return (
    <div>
      {isLoading && <AppLoading />}
      <Card className="shadow-lg">
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Row gutter={[12, 12]}>
                <Col span={6}>
                  <AppInput
                    typeInput="number"
                    name="index"
                    label="Số trang"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số trang",
                      },
                    ]}
                  />
                </Col>
                <Col span={6}>
                  <AppSelect
                    name="type"
                    label="Loại"
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
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Hình ảnh"
                    valuePropName="fileList"
                    name="file"
                    getValueFromEvent={normFile}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn hình ảnh",
                      },
                    ]}
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
              <Button type="primary" htmlType="submit">
                {id ? "Cập nhật" : "Tạo"}
              </Button>
            </Col>
            <Col span={12}>
              <Typography.Text>Preview</Typography.Text>
              <HTMLFlipBook
                width={400}
                height={350}
                className="demoBook h-full "
                style={{}}
                startPage={1}
                size="fixed"
                drawShadow={true}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                onFlip={() => {
                  audioRef?.current?.play();

                  // // api.start({ transform: "translateX(10px)" });
                }}
                minWidth={200}
                maxWidth={400}
                minHeight={350}
                maxHeight={350}
                flippingTime={1}
                usePortrait={true}
                startZIndex={1}
                autoSize={true}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={100}
                showPageCorners={true}
                disableFlipByClick={true}
              >
                {dataSort?.map((image: any) => (
                  <div
                    key={image.index}
                    // style={props}
                    className="demoPage text-black bg-[#e6e4d1] p-10 flex justify-center items-center object-contain"
                  >
                    <img src={image.image} className="h-full object-fill" />
                    {image.index === 0 ||
                    image.index === listMenus?.length - 1 ? null : (
                      <div
                        className={cn(
                          "flex justify-start",
                          image.index % 2 !== 0 && "justify-end"
                        )}
                      >
                        <Typography.Text className="text-sm font-semibold">
                          {image.index}
                        </Typography.Text>
                      </div>
                    )}
                  </div>
                ))}
              </HTMLFlipBook>

              <audio ref={audioRef} hidden>
                <source src="audios/sound-page-flip.mp3" type="audio/mpeg" />
                <p>Your browser does not support the audio element.</p>
              </audio>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default MenuProductCrud;

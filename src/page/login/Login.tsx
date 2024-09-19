import { Button, Col, Form, Row, Typography } from "antd";
import React from "react";
import AppInput from "../../components/shared/app-input";
import { useDispatch } from "react-redux";
import { login } from "../../store";
import { useNavigate } from "react-router-dom";
import { routers } from "../../routes";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (value: any) => {
    if (value.username === "admin" && value.password == "123456") {
      dispatch(login());
      navigate(routers.admin.productView);
    }
  };
  return (
    <div className="login-page w-screen h-screen flex justify-center items-center bg-card flex-col gap-14">
      <div className="shadow-xl rounded-xl p-8 bg-white">
        <Row gutter={[24, 24]}>
          <Col span={24} className=" flex justify-center items-center  p-8">
            <Form onFinish={handleSubmit} layout="vertical">
              <Row gutter={[12, 12]}>
                <Col span={24}>
                  <AppInput
                    label="Nhập username"
                    name="username"
                    rules={[{ required: true, message: "Nhập username" }]}
                  />
                </Col>
                <Col span={24}>
                  <AppInput
                    name="password"
                    typeInput="password"
                    label="Mật khẩu"
                    rules={[{ required: true, message: "Nhập password" }]}
                  />
                </Col>

                <Col span={24} className="p-8">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full p-8 hover:bg-[#85cfed]"
                  >
                    <Typography.Text className="text-cxl font-semibold text-white">
                      Đăng nhập
                    </Typography.Text>
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
      {/* <Link to={"https://itbus.vn/"} target="_blank">
        <Image
          src="/images/logo-it-bus.png"
          preview={false}
          className="w-full h-16 object-contain"
        />
      </Link> */}
    </div>
  );
};

export default LoginPage;

import { Button, Col, Form, Image, Row, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import AppInput from "../../components/shared/app-input";

const LoginPage: React.FC = () => {
  const handleSubmit = () => {};
  return (
    <div className="login-page w-screen h-screen flex justify-center items-center bg-card flex-col gap-14">
      <div className="shadow-xl rounded-xl p-8 bg-white">
        <Row gutter={[24, 24]}>
          <Col
            span={12}
            className=" flex justify-center items-center border rounded-lg shadow"
          >
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
          <Col span={12} className="flex justify-center">
            <Image
              src="/images/logo-toc-1.png"
              preview={false}
              width={400}
              height={400}
            />
          </Col>
        </Row>
      </div>
      <Link to={"https://itbus.vn/"} target="_blank">
        <Image
          src="/images/logo-it-bus.png"
          preview={false}
          className="w-full h-16 object-contain"
        />
      </Link>
    </div>
  );
};

export default LoginPage;

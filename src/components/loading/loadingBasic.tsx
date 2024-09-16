import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const LoadingBasic = () => {
  return (
    <div style={{ height: "80vh", textAlign: "center" }}>
      <Spin
        style={{ marginTop: "40vh" }}
        indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
      />
    </div>
  );
};
export default LoadingBasic;

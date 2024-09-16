import { ConfigProvider } from "antd";

type Props = { children: React.ReactNode; primaryColor: string };
const Config: React.FC<Props> = ({ children, primaryColor }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
export default Config;

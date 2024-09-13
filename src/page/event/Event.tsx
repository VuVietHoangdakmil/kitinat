import { useParams } from "react-router-dom";
import { KEY } from "../../types/enum";
import { Col, List, Row } from "antd";
import { animated, useTransition } from "@react-spring/web";
interface DataEvent {
  key: string;
  title: string;
  content: { text?: string; src?: string; listSrc?: string[] }[];
  footer: { title: string; text: string }[];
}
const Data: DataEvent[] = [
  {
    key: KEY.APP,
    title:
      "ECoffeeLink CHÍNH THỨC RA MẮT ỨNG DỤNG, “KƯNG” THÀNH VIÊN KHÔNG GIỚI HẠN",
    content: [
      {
        text: "Sau thời gian ấp ủ, cuối cùng ECoffeeLink tự hào ra mắt phiên bản Mobile App – ứng dụng thành viên & đặt món dành riêng cho Katies. Đây chính là bước tiến mới trong hành trình chăm sóc khách hàng của ECoffeeLink cùng trải nghiệm đặt món với đa phương thức như: Pick- up ",
      },
      {
        text: "👉 Tải app ECoffeeLink ngay để được “kưng” bởi các chương trình ưu đãi siêu hấp dẫn:",
      },
      {
        text: "🔹 Nhận ngay Voucher Ưu đãi 100k BST Bình “Hường” cho 999 tài khoản đăng ký thành công sớm nhất. (Từ 9:00 25/04)",
      },
      {
        text: "🔹 Nhận Voucher ưu đãi 30k cho đơn tối thiểu 60k (từ 25/04 – 09/05)",
      },
      {
        text: "🔹 Nhận ngay Voucher ưu đãi 50k đơn tối thiểu 150K khi giới thiệu bạn bè tải và đăng kí tài khoản thành công trên ứng dụng.",
      },
      {
        text: "Song Song với việc ra mắt ứng dụng ECoffeeLink là chương trình chăm sóc thành viên hoàn toàn mới áp dụng từ 25/4/2024. Chi tiết Katies vui lòng truy cập vào link bên dưới hoặc trực tiếp trong ứng dụng.",
      },
      { src: "/img/home/content5/content5b.jpeg" },
      {
        listSrc: [
          `http://ECoffeeLink.vn/wp-content/uploads/2024/04/439734855_423010750427791_1584755298511189823_n-1024x1024.jpeg`,
          "https://ECoffeeLink.vn/wp-content/uploads/2024/04/439998508_423010787094454_2153189648251664615_n.jpeg",
          "https://ECoffeeLink.vn/wp-content/uploads/2024/04/439987021_423010760427790_3432944689327931477_n.jpeg",
        ],
      },
    ],
    footer: [
      {
        title: "Previous Post:",
        text: " ECoffeeLink RA MẮT CÓC CÓC ĐÁC ĐÁC, KHUẤY ĐỘNG HÈ 2024",
      },
      {
        title: "Next Post:",
        text: "HUYỀN CHÂU BƠ SỮA – DẺO HUYỀN CHÂU, THƠM SỮA MỚI – CHÍNH THỨC ĐƯỢC RA MẮT",
      },
    ],
  },
  {
    key: KEY.HUYEN_CHAU_BO_SUA,
    title:
      "HUYỀN CHÂU BƠ SỮA – DẺO HUYỀN CHÂU, THƠM SỮA MỚI – CHÍNH THỨC ĐƯỢC RA MẮT",
    content: [
      {
        text: "Huyền Châu Bơ Sữa chính là sự sáng tạo mới đầy hấp dẫn, đánh dấu lần hợp tác chính thức của ECoffeeLink và CP-Meiji Vietnam. ❤️",
      },
      {
        text: "Lần đầu tiên ECoffeeLink ra mắt trân châu dẻo đường nâu với tên gọi mỹ miều là Huyền Châu, từng viên Huyền Châu bóng bẩy được nhào nặn từ chính đôi bàn tay nghệ nhân ECoffeeLink, chắc chắn sẽ mang đến Katies cảm nhận vị giác khó quên qua từng lần nhai dẻo mềm. 😋😋",
      },
      {
        text: "Đặc biệt, giúp nâng tầm “vơ đét” Huyền Châu chính là nền sữa tươi Meiji cao cấp với công nghệ siêu thanh trùng Nhật Bản, mang lại vị béo, ngậy đặc trưng. Điểm nhấn sáng tạo cùng lớp bơ xay mịn màng từ giống bơ 034 trứ danh bên trên, tất cả tạo nên một phong vị mới, đáng trải nghiệm.",
      },
      {
        text: "Huyền Châu Bơ Sữa được thưởng thức ngon nhất khi Katies khuấy đều, sau đó từ từ cảm nhận từng tầng hương vị độc đáo.",
      },
      {
        text: "👉 Lên lịch ghé ECoffeeLink thưởng thức Huyền Châu Bơ Sữa nào Katies ơiii.",
      },
    ],
    footer: [
      {
        title: "Previous Post:",
        text: "ECoffeeLink CHÍNH THỨC RA MẮT ỨNG DỤNG, “KƯNG” THÀNH VIÊN KHÔNG GIỚI HẠN",
      },
    ],
  },
  {
    key: KEY.COC_MAT_ĐAC_THOM,
    title: "ECoffeeLink RA MẮT CÓC CÓC ĐÁC ĐÁC, KHUẤY ĐỘNG HÈ 2024",
    content: [
      {
        text: "Cóc Cóc Đác Đác – Cóc Mát Đác Thơm chính thức được ra mắt trên toàn hệ thống ECoffeeLink vào ngày 24/3/2024.",
      },
      {
        text: "Tự hào mang đến hai đặc sản vùng miền độc đáo, Cóc Cóc Đác Đác đã được nghệ nhân ECoffeeLink sáng tạo từ những chắt chiu chọn lọc nơi vườn trồng. Như cả vườn nhiệt đới hiện ra trước mắt, Cóc Cóc Đác Đác chính là sự hoà quyện hoàn hảo của trà xanh thanh nhẹ cùng nước ép Cóc Non Đồng Tháp tươi mát, chua chua vừa vị, điểm nhấn cùng hạt đác Phú Yên bóng bẩy, rim thơm dẻo giòn. 🥰",
      },
      {
        text: "👉 Lên lịch ghé ECoffeeLink thưởng thức hương vị chào hè mới mẻ này nào Katies ơiii.",
      },
      {
        src: "https://ECoffeeLink.vn/wp-content/uploads/2024/04/432783099_402994675762732_8827534077984566267_n.jpg",
      },
    ],
    footer: [
      {
        title: "Previous Post:",
        text: "OOLONG BA LÁ CHÍNH THỨC CHÀO XUÂN 2024",
      },
      {
        title: "Next Post:",
        text: "ECoffeeLink CHÍNH THỨC RA MẮT ỨNG DỤNG, “KƯNG” THÀNH VIÊN KHÔNG GIỚI HẠN",
      },
    ],
  },
  {
    key: KEY.NHAI_SUA_LUC_VAN,
    title: "NHÀI SỮA LỤC VÂN – ĐIỂM TẦNG HƯƠNG – VƯƠNG NHÀI TRẮNG",
    content: [
      {
        text: "CHÍNH THỨC ĐƯỢC RA MẮT 🎉",
      },
      {
        text: "Khởi đầu năm mới, tận hưởng từng tầng hương hoa nhài trắng của Nhài Sữa Lục Vân được ra mắt vào ngày 08/01/2024 trên toàn hệ thống.",
      },
      {
        text: "Đột phá về công thức ủ trà mới mẻ, Nhài Sữa Lục Vân là sự kết hợp hoà quyện tinh tế giữa trà xanh đậm vị thanh tươi được ủ cùng hoa nhài thanh khiết, hương thơm ấn tượng.🌱",
      },
      {
        text: "Bằng chính đôi bàn tay tỉ mỉ, nghệ nhân ECoffeeLink đã cho ra đời công thức đặc biệt, nâng tầm hương vị Nhài Sữa Lục Vân ngay lần đầu thưởng thức bởi vị trà sữa thanh tao cùng hương hoa nhài khó phai, vương vấn.",
      },
      {
        text: "Nhài Sữa Lục Vân sẽ ngon hơn khi được thưởng thức kèm Topping, tag các tín đồ mê nhài sữa vào đây nào Katies ơiii. 🥰",
      },
      {
        src: "https://ECoffeeLink.vn/wp-content/uploads/2024/01/LUC-VAN.jpg",
      },
      {
        text: "Đừng quên theo dõi Facebook/ Instagram/ Tiktok @ECoffeeLinkcoffee&teahouse để cập nhật thêm nhiều thông tin hơn bạn nhé!",
      },
    ],
    footer: [
      {
        title: "Previous Post:",
        text: "VIEW NGẮM PHÁO HOA CỰC ĐỈNH TẠI ECoffeeLink BẾN BẠCH ĐẰNG",
      },
      {
        title: "Next Post:",
        text: " OOLONG BA LÁ CHÍNH THỨC CHÀO XUÂN 2024",
      },
    ],
  },
];
const Event = () => {
  const { id } = useParams();
  const event = Data.find((Data) => Data.key === id);
  const transitions = useTransition(null, {
    keys: null,
    from: { opacity: 0, transform: "translate3d(0,-100%,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(0,100%,0)" },
    config: { duration: 500 },
  });
  return (
    <div>
      <header
        style={{
          backgroundColor: "var(--primary-color)",
          fontSize: "20px",
          fontWeight: "bold",
          height: "100px",
          lineHeight: "100px",
          textAlign: "center",
          zIndex: 2,
          position: "relative",
        }}
      >
        {event?.title}
      </header>
      <div style={{ width: "var(--with-main)", margin: "0 auto", zIndex: 1 }}>
        {transitions((style) => (
          <animated.div style={style}>
            <main style={{ width: "90%", margin: "0 auto" }}>
              <List
                grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 3, xl: 3, xxl: 3 }}
                renderItem={(item, index) => {
                  const { text, src, listSrc } = item as any;
                  if (text) {
                    return (
                      <p
                        style={{ color: "var(--text-black-color)" }}
                        key={index}
                      >
                        {text}
                      </p>
                    );
                  }
                  if (src) {
                    return (
                      <img
                        alt=""
                        loading="lazy"
                        key={index}
                        style={{
                          width: "100%",
                          borderRadius: "25px",
                          margin: "20px auto",
                          display: "block",
                          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                        }}
                        src={src}
                      />
                    );
                  }
                  if (listSrc) {
                    return (
                      <Row gutter={24} key={index} style={{ margin: "25px 0" }}>
                        {" "}
                        {listSrc.map((src: any, index: number) => (
                          <Col key={index} span={8}>
                            <img
                              src={src}
                              alt=""
                              loading="lazy"
                              style={{
                                width: "100%",
                                borderRadius: "20px",
                                boxShadow:
                                  "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                              }}
                            />
                          </Col>
                        ))}
                      </Row>
                    );
                  }
                  return <></>;
                }}
              />
            </main>
          </animated.div>
        ))}
        <footer
          style={{
            width: "90%",
            margin: "40px auto",
            borderTop: "1px black solid",
            borderBottom: "1px black solid",
          }}
        >
          <div style={{ padding: "10px 0" }}>
            {event?.footer.map((item, index) => (
              <p style={{ color: "var(--text-black-color)" }} key={index}>
                {item.title}{" "}
                <span style={{ color: "var(--primary-color)" }}>
                  {item.text}
                </span>
              </p>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
};
export default Event;

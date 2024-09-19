import { Typography } from "antd";
import MenuBook from "./components/menu-book";
import "./content.scss";
import Content1 from "./content/content1";
import Content2 from "./content/content2";
import Content3 from "./content/content3";
import Content4 from "./content/content4";

const Home = () => {
  return (
    <>
      <div className="w-full mx-auto  bg-current">
        <Content1 />
      </div>
      <div className=" px-5 mx-auto mt-12 bg-current w-2/3">
        <div className="mt-12 mx-auto  sm:w-[85%] overflow-hidden">
          <Content2 />
        </div>
        <div className=" sm:w-[85%] mx-auto mt-12 bg-current">
          <Content3 />
        </div>
        <div className=" sm:w-[85%] mx-auto mt-12">
          <Content4 />
        </div>

        {/* <div className=" sm:w-[85%] mx-auto mt-12">
          <Content5 />
        </div> */}
      </div>
      <div className="w-full h-screen relative   flex align-middle flex-col justify-center">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-fixed brightness-50"
          style={{
            backgroundImage: 'url("/img/view/view1.jpg")',
            transition: "all 1s ease-out, opacity 1s ease-out",
          }}
        />
        <div className="flex flex-col justify-center items-center z-10">
          <Typography.Title
            style={{
              fontFamily: "iCiel Rukola, Sans-serif;",
              color: " var(--primary-color)",
            }}
            className=""
          >
            Menu
          </Typography.Title>
        </div>
        <div className="z-10 brightness-100 ">
          <MenuBook />
        </div>
      </div>
    </>
  );
};

export default Home;

import Content2 from "./content/content2";
import Content3 from "./content/content3";
import Content4 from "./content/content4";
import Content5 from "./content/content5";
import Content1 from "./content/content1";
import "./content.scss";

const Home = () => {
  return (
    <>
      <div className="w-full mx-auto  bg-current">
        <Content1 />
      </div>
      <div className=" px-5 mx-auto mt-12 bg-current w-5/6">
        <div className="mt-12 mx-auto  sm:w-[85%] overflow-hidden">
          <Content2 />
        </div>
        <div className=" sm:w-[85%] mx-auto mt-12">
          <Content3 />
        </div>
        <div className=" sm:w-[85%] mx-auto mt-12">
          <Content4 />
        </div>
        <div className=" sm:w-[85%] mx-auto mt-12">
          <Content5 />
        </div>
      </div>
    </>
  );
};

export default Home;

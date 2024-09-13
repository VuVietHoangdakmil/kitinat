import Content2 from "./content/content2";
import Content3 from "./content/content3";
import Content4 from "./content/content4";
import Content5 from "./content/content5";
import Content1 from "./content/content1";

const Home = () => {
  return (
    <>
      <div className="w-11/12 mx-auto mt-12 lg:w-4/5 xl:w-3/4">
        <Content1 />
      </div>
      <div className="w-full px-4 mx-auto mt-12 md:w-11/12 lg:w-4/5 xl:w-3/4">
        <div className="mt-12 overflow-hidden">
          <Content2 />
        </div>
        <div className="w-full mt-12">
          <Content3 />
        </div>
        <div className="w-full mt-12">
          <Content4 />
        </div>
        <div className="w-full mt-12">
          <Content5 />
        </div>
      </div>
    </>
  );
};

export default Home;

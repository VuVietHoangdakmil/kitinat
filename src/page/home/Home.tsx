import Content2 from "./content/content2";
import Content3 from "./content/content3";
import Content4 from "./content/content4";
import Content5 from "./content/content5";
import Content1 from "./content/content1";

const Home = () => {
  return (
    <>
      <div style={{ width: "90%", margin: "50px auto 0 auto" }}>
        <Content1 />
      </div>
      <div style={{ width: "var(--with-main)", margin: "50px auto" }}>
        <div style={{ marginTop: "50px", overflow: "hidden" }}>
          <Content2 />
        </div>
        <div style={{ width: "100%", marginTop: "50px" }}>
          <Content3 />
        </div>
        <div style={{ width: "100%", marginTop: "50px" }}>
          <Content4 />
        </div>
        <div style={{ width: "100%", marginTop: "50px" }}>
          <Content5 />
        </div>
      </div>
    </>
  );
};
export default Home;

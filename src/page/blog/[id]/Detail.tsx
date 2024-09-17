import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import { Blog } from "../../../types/blogs";
import TinyCss from "../../../components/provider/TinyCss";
import { Image } from "antd";
import parse from "html-react-parser";
import "./index.css";
const Detail = () => {
  const { id } = useParams();
  const [blog, setblog] = useState<Blog>();
  const [loading, setLoading] = useState<boolean>(false);
  const fetchblogDetails = async (blogId: string) => {
    setLoading(true);
    try {
      const docRef = doc(db, "blogs", blogId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const blogData = docSnap.data() as any;
        setblog(blogData);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching blog details: ", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchblogDetails(id + "");
  }, [id]);

  if (loading) {
    return <div style={{ minHeight: "60vh" }}></div>;
  }
  return (
    <TinyCss>
      <div
        style={{
          color: "black",
          margin: "0 auto",

          minHeight: "60vh",
        }}
        className="sm:w-[80%] px-3"
      >
        <div className="sm:w-10/12 mx-auto mb-10">
          <h1>{blog?.title}</h1>
          <p className="text-lg text-[#404040]">{blog?.summary}</p>
        </div>

        <Image
          src={blog?.img}
          width={"100%"}
          height={600}
          preview={false}
          className="rounded-md"
        />
        <div className="sm:w-10/12  mx-auto mt-10">
          {parse(blog?.content + "")}
        </div>
      </div>
    </TinyCss>
  );
};
export default Detail;

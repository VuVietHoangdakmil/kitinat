import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { Blog } from "../../../types/data/blogs";
import TinyCss from "../../../components/provider/TinyCss";
import { Image, Spin } from "antd";
import parse from "html-react-parser";
import "./index.css";
import { firebaseService } from "../../../service/crudFireBase";
const Detail = () => {
  const { id } = useParams();
  const { getById } = firebaseService;
  const [blogData, setblogData] = useState<Blog>({});
  const [loading, setLoading] = useState<boolean>(false);

  const fetchblogDetails = async (blogId: string) => {
    setLoading(true);
    try {
      const blog = await getById<Blog>("blogs", blogId);

      if (blog) {
        setblogData(blog);
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
    return (
      <Spin
        style={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
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
          <h1>{blogData?.title}</h1>
          <p className="text-lg text-[#404040]">{blogData?.summary}</p>
        </div>

        <Image
          src={blogData?.img}
          width={"100%"}
          height={600}
          preview={false}
          className="rounded-md"
        />
        <div className="sm:w-10/12  mx-auto mt-10">
          {parse(blogData?.content + "")}
        </div>
      </div>
    </TinyCss>
  );
};
export default Detail;

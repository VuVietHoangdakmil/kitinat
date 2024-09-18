import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import { Product } from "../../../types/data/product";
import TinyCss from "../../../components/provider/TinyCss";
import parse from "html-react-parser";
import "./index.css";
const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState<boolean>(false);
  const fetchProductDetails = async (productId: string) => {
    setLoading(true);
    try {
      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const productData = docSnap.data() as any;
        setProduct(productData);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching product details: ", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchProductDetails(id + "");
  }, [id]);

  if (loading) {
    return <div style={{ minHeight: "64vh" }}></div>;
  }
  return (
    <TinyCss>
      <div
        style={{
          color: "black",
          margin: "0 auto",
          minHeight: "64vh",
        }}
        className="w-2/4"
      >
        <h1 style={{ margin: "20px 0" }}>{product?.title}</h1>

        {parse(product?.summary + "" + product?.content)}
      </div>
    </TinyCss>
  );
};
export default Detail;

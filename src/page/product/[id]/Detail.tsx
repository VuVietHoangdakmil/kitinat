import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import { Product } from "../../../types/product";
import parse from "html-react-parser";
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
  console.log("Fetching product details", product);
  if (loading) {
    return <div style={{ minHeight: "60vh" }}></div>;
  }
  return (
    <div
      style={{
        color: "black",
        margin: "0 auto",
        width: "80%",
        minHeight: "60vh",
      }}
    >
      <h1 style={{ margin: "20px 0" }}>{product?.title}</h1>

      {parse(product?.summary + "" + product?.content)}
    </div>
  );
};
export default Detail;

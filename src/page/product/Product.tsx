import { usePagination } from "../../hook/helpers/usePagination.hook";
import { getProducts } from "../../services/product.service";

function MyBook() {
  const { data } = usePagination("list-product", {}, getProducts);
  console.log(data);
  return <div>product</div>;
}
export default MyBook;

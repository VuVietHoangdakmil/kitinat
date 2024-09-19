import { List, Typography } from "antd";
import { usePagination } from "../../hook/helpers/usePagination.hook";
import { getListProducts } from "../../services/product.service";

function MyBook() {
  const { data } = usePagination("list-product", {}, getListProducts);
  return (
    <div className="min-h-[63rem] flex justify-center ">
      <List
        dataSource={data ?? []}
        header={
          <Typography.Title style={{ color: " var(--primary-color)" }}>
            Menu
          </Typography.Title>
        }
        className="w-1/2"
        renderItem={(item: any) => (
          <div className="flex items-center justify-between py-4 gap-2">
            <Typography.Title level={2} className="text-lg font-medium">
              {item.name}
            </Typography.Title>
            <div
              className="flex-1 border-dotted border-t border-text-primary mx-4"
              style={{ borderTop: "2px dotted" }}
            ></div>

            <div className="text-lg font-bold ">
              {item.variants.map((variant: any) => (
                <div className="flex items-center gap-4">
                  <Typography.Text className="uppercase text-text-primary font-medium">
                    {variant.size}
                  </Typography.Text>
                  <Typography.Text className="uppercase text-text-primary font-medium">
                    {Number(variant.price).toLocaleString("en-US") + "đ"}
                  </Typography.Text>
                </div>
              ))}
            </div>
          </div>
        )}
      />
    </div>
  );
}
export default MyBook;

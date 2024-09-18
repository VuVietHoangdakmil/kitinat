import { Divider, List, Typography } from "antd";
import { usePagination } from "../../hook/helpers/usePagination.hook";
import { getListProducts } from "../../services/product.service";

function MyBook() {
  const { data } = usePagination("list-product", {}, getListProducts);
  return (
    <div className="min-h-[63rem] flex justify-center ">
      <List
        dataSource={data ?? []}
        className="w-1/2"
        renderItem={(item: any) => (
          <div className="flex items-center justify-between py-4 border-b border-gray-300">
            <div>
              <Typography.Title level={2} className="text-lg font-semibold">
                {item.name}
              </Typography.Title>
              <p className="text-sm text-gray-500">
                Pork ball Noodle soup with Pork ribs & fresh Herbs
              </p>
            </div>

            <Divider type="vertical" className="flex-1 border-dotted mx-4" />

            <div className="text-lg font-bold">
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

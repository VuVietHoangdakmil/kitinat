import { Button, List } from "antd";
import React from "react";
import ItemVariant from "../item-variant";
type Props = {
  value?: any;
  onChange?: (value: any) => void;
};
const VariantsProduct: React.FC<Props> = ({ value = [], onChange }) => {
  const handleUpdateVariant = (index: number) => (variant: any) => {
    const variants = [...(value || [])];
    variants[index] = variant;
    onChange?.(variants);
  };

  const handleAddVariant = () => {
    const variants = [...(value || [])];
    variants.push({} as any);
    onChange?.(variants);
  };

  const handleRemoveVariant = (index: number) => () => {
    const variants = [...(value || [])];
    variants.splice(index, 1);
    onChange?.(variants);
  };
  return (
    <div>
      <List
        grid={[16, 16]}
        dataSource={value as any}
        renderItem={(item, index) => (
          <ItemVariant
            key={index}
            variant={item}
            onUpdateVariant={handleUpdateVariant(index)}
            onRemove={handleRemoveVariant(index)}
          />
        )}
        footer={
          <div className="flex justify-start">
            <Button type="primary" onClick={handleAddVariant}>
              Thêm
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default VariantsProduct;

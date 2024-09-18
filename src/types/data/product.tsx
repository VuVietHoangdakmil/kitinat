export interface Product {
  content: string;
  id: string;
  key: string;
  metaDescription: string;
  metaKeyWord: string;
  metaTitle: string;
  price: string;
  priceDisCount: string;
  slug: string;
  summary: string;
  title: string;
  uploadImg: string;
}

export type StoreCreateMenuProduct = {
  image: string;
  index: number;
  type: string;
};

export type StoreCreateProduct = {
  image: string;
  name: string;
  description: string;
  variants: {
    size: string;
    price: number;
  };
};

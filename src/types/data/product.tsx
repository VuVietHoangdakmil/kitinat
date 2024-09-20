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

export type StoreProduct = {
  id: string;
  image: string;
  name: string;
  description: string;
  variants: {
    size: string;
    price: number;
  };
};

export type StoreCreateMenuProduct = {
  image: string;
  index: number;
  type: string;
};
export type StoreMenuProduct = {
  image: string;
  index: number;
  type: string;
  id: number;
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

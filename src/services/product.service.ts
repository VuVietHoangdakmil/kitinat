import axiosClient from "../libs/axios";
import {
  StoreCreateMenuProduct,
  StoreCreateProduct,
  StoreProduct,
} from "../types/data/product";

export const getListProducts = async () => {
  return await axiosClient.get(import.meta.env.VITE_APP_API_PRODUCT);
};

export const getProductDetail = async (id: string): Promise<StoreProduct> => {
  return await axiosClient.get(import.meta.env.VITE_APP_API_PRODUCT + `${id}`);
};

export const createProduct = async (body: StoreCreateProduct) => {
  return await axiosClient.post(import.meta.env.VITE_APP_API_PRODUCT, body);
};
export const updateProduct = async (id: string, body: StoreCreateProduct) => {
  return await axiosClient.put(
    import.meta.env.VITE_APP_API_PRODUCT + `${id}/`,
    body
  );
};

export const deleteProduct = async (id: string) => {
  return await axiosClient.delete(
    import.meta.env.VITE_APP_API_PRODUCT + `${id}`
  );
};
export const createMenu = async (body: StoreCreateMenuProduct) => {
  return axiosClient.post(import.meta.env.VITE_APP_API_MENU_PRODUCT, body);
};

export const getMenusProduct = async () => {
  return await axiosClient.get(import.meta.env.VITE_APP_API_MENU_PRODUCT);
};

export const getMenuProduct = async (key: string) => {
  return await axiosClient.get(
    import.meta.env.VITE_APP_API_MENU_PRODUCT + `${key}`
  );
};
export const updateMenu = async (key: string, body: StoreCreateMenuProduct) => {
  return await axiosClient.put(
    import.meta.env.VITE_APP_API_MENU_PRODUCT + `${key}/`,
    body
  );
};
export const deleteMenuProductByIndex = async (index: number) => {
  return await axiosClient.delete(
    import.meta.env.VITE_APP_API_MENU_PRODUCT_DELETE_INDEX + `${index}`
  );
};
export const deleteMenuProduct = async (key: string) => {
  return await axiosClient.delete(
    import.meta.env.VITE_APP_API_MENU_PRODUCT + `${key}`
  );
};

export const getMenuProductByIndex = async (index: string) => {
  return await axiosClient.get(
    import.meta.env.VITE_APP_API_MENU_PRODUCT + `${index}`
  );
};

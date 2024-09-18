import axiosClient from "../libs/axios";
import { StoreCreateMenuProduct } from "../types/data/product";

export const getProducts = async () => {
  const { data } = await axiosClient.get(import.meta.env.VITE_APP_API_PRODUCT);
  return data;
};
export const createMenu = async (body: StoreCreateMenuProduct) => {
  return axiosClient.post(import.meta.env.VITE_APP_API_MENU_PRODUCT, body);
};

export const getMenusProduct = async () => {
  return await axiosClient.get(import.meta.env.VITE_APP_API_MENU_PRODUCT);
};

export const getMenuProduct = async (key: number) => {
  return await axiosClient.get(
    import.meta.env.VITE_APP_API_MENU_PRODUCT + `${key}`
  );
};
export const deleteMenuProduct = async (key: number) => {
  return await axiosClient.delete(
    import.meta.env.VITE_APP_API_MENU_PRODUCT + `${key}`
  );
};

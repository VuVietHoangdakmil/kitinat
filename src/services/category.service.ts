import axiosClient from "../libs/axios";
import { StoreCreateCategory } from "../types/data/category";

export const getListCategories = async () => {
  return axiosClient.get(import.meta.env.VITE_APP_API_CATEGORY);
};

export const createCategory = async (body: StoreCreateCategory) => {
  return axiosClient.post(import.meta.env.VITE_APP_API_CATEGORY, body);
};
export const deleteCategory = async (id: string) => {
  return axiosClient.delete(import.meta.env.VITE_APP_API_CATEGORY + `/${id}/`);
};

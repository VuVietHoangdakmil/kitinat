import axiosClient from "../libs/axios";

export const getListCategories = async () => {
  return axiosClient.get(import.meta.env.VITE_APP_API_CATEGORY);
};

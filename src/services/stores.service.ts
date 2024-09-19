import axiosClient from "../libs/axios";
import { StoreBody } from "../types/data/store";

export const getStore = async () => {
  const data = await axiosClient.get(import.meta.env.VITE_APP_API_STORE);
  return data;
};
export const createStore = async (body: StoreBody) => {
  return axiosClient.post(import.meta.env.VITE_APP_API_STORE, body);
};

export const updateStore = async (key: number, body: StoreBody) => {
  return axiosClient.put(import.meta.env.VITE_APP_API_STORE + `${key}/`, body);
};

export const getStoreById = async (key: number): Promise<any> => {
  return await axiosClient.get(import.meta.env.VITE_APP_API_STORE + `${key}`);
};
export const deleteStore = async (key: number) => {
  return await axiosClient.delete(
    import.meta.env.VITE_APP_API_STORE + `${key}`
  );
};

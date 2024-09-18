import axiosClient from "../libs/axios";
import { BlogBody } from "../types/data/blogs";

export const getBlog = async () => {
  const data = await axiosClient.get(import.meta.env.VITE_APP_API_BLOG);
  return data;
};
export const createBlog = async (body: BlogBody) => {
  return axiosClient.post(import.meta.env.VITE_APP_API_BLOG, body);
};

export const updateBlog = async (key: number, body: BlogBody) => {
  return axiosClient.put(import.meta.env.VITE_APP_API_BLOG + `${key}`, body);
};

export const getBlogById = async (key: number): Promise<any> => {
  return await axiosClient.get(import.meta.env.VITE_APP_API_BLOG + `${key}`);
};
export const deleteBlog = async (key: number) => {
  return await axiosClient.delete(import.meta.env.VITE_APP_API_BLOG + `${key}`);
};

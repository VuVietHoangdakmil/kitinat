import axiosClient from "../libs/axios";

export const uploadManyFiles = async (formData: FormData) => {
  const response = await axiosClient.post<FormData, any>(
    import.meta.env.VITE_APP_UPLOAD,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

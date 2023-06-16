import axios, { type AxiosProgressEvent } from "axios";

export enum FolderEnum {
  PROFILE = "profile",
  ASSIGNMENT = "assignment",
}

export const uploadFile = async (
  url: string,
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => {
  const axiosInstance = axios.create();

  await axiosInstance.put<null>(url, file, {
    headers: {
      "Content-Type": file.type,
    },
    onUploadProgress,
  });
};

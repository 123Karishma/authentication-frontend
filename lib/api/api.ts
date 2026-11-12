
import axiosInstance from "../axiosInstance";
import { handleApiError } from "./apiError";

export const handleCreateUser = async (data: any) => {
  try {
    const result = await axiosInstance.post(`${"/api/user/createuser"}`, data);
    return result.data;
  } catch (error) {
    handleApiError(error);
  }
};


export const handleUserLogin = async (data: any) => {
  try {
    const result = await axiosInstance.post(`${"/api/user/"}`, data);
    return result.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserProfile = async () => {
    try {
        const result = await axiosInstance.get("/api/user/profile/id");
        return result.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const UserLogout=async()=>{
  try{
    const result = await axiosInstance.post("/api/user/logout");
    return result.data;
  } catch (error) {
    handleApiError(error);
  }
}
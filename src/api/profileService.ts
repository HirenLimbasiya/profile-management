import { ProfileForm } from "../types/profile";
import delay from "../utils/helper";
import axiosInstance from "./index";

const PROFILE_URL = "/profile"; // The endpoint for the single profile

export const getProfile = async () => {
  await delay(1000)
  const response = await axiosInstance.get<ProfileForm>(PROFILE_URL);
  return response.data;
};

export const saveProfile = async (profile: ProfileForm) => {
  await delay(1000);
  // throw new Error(`Cannot save profile`);
  const response = await axiosInstance.put<ProfileForm>(PROFILE_URL, profile);
  return response.data;
};

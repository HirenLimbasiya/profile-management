import { ProfileForm } from "../types/profile";
import delay from "../utils/helper";
import axiosInstance from "./index";

const PROFILE_URL = "/profile";

const isDevelopment = process.env.REACT_APP_ENV === "development";

export const getProfile = async () => {
  await delay(1000);
  if (isDevelopment) {
    const response = await axiosInstance.get<ProfileForm>(PROFILE_URL);
    return response.data;
  } else {
    return {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
    } as ProfileForm;
  }
};

export const saveProfile = async (profile: ProfileForm) => {
  await delay(1000);
  if (isDevelopment) {
    const response = await axiosInstance.put<ProfileForm>(PROFILE_URL, profile);
    return response.data;
  } else {
    return profile;
  }
};

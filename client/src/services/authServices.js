import axiosInstance from "@/lib/axiosInstance";

// Base API URL
const BASE_URL = "/auth";

// User Registration
export const registerUser = async (userData) => {
  const { data } = await axiosInstance.post(`${BASE_URL}/register`, userData);
  return data;
};

// User Login
export const loginUser = async (credentials) => {
  const { data } = await axiosInstance.post(`${BASE_URL}/login`, credentials);
  return data;
};

// Forget Password
export const forgetPassword = async (email) => {
  const { data } = await axiosInstance.post(`${BASE_URL}/forget-password`, {
    email,
  });
  return data;
};

// Reset Password
export const resetPassword = async (token, newPassword) => {
  const { data } = await axiosInstance.put(
    `${BASE_URL}/reset-password/${token}`,
    { newPassword }
  );
  return data;
};

// Verify Email
export const verifyEmail = async (token) => {
  const { data } = await axiosInstance.get(`${BASE_URL}/verify-email/${token}`);
  return data;
};

// Logout User
export const logoutUser = async () => {
  const { data } = await axiosInstance.post(`${BASE_URL}/logout`);
  return data;
};

// Refresh Token
export const refreshToken = async () => {
  const { data } = await axiosInstance.post(`${BASE_URL}/refresh-token`);
  return data;
};

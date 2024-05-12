import axiosInstance from './axios';
import { API } from './consts';

export const registerUser = async (data) => {
  const response = await axiosInstance.post(`${API}/auth/register`, data);

  if (response) {
    return response.data;
  }
};

export const loginUser = async (data) => {
  const response = await axiosInstance.post(`${API}/auth/login`, data);

  if (response) {
    return response.data;
  }
};

export const checkUser = async () => {
  const token = localStorage.getItem('authToken');

  const response = await axiosInstance.get(`${API}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    dontUseSpinner: true,
    dontShowSuccess: true,
    dontShowError: true,
  });

  if (response) {
    return response.data;
  }
};

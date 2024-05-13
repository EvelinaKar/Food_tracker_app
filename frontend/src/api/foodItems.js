import axiosInstance from './axios';
import { API } from './consts';

export const createFoodItem = async (data) => {
  try {
    const response = await axiosInstance.post(`${API}/api/create-food`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create food.');
  }
};

export const fetchFoodItems = async () => {
  try {
    const response = await axiosInstance.get(`${API}/api/my-foods`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch foods');
  }
};

import axiosInstance from './axios';
import { API } from './consts';

export const createFoodItem = async (data) => {
  try {
    const response = await axiosInstance.post(`${API}/api/create-food`, data);

    if (response) {
      return response.data;
    }

    throw new Error('Unexpected response structure');
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to create food item');
  }
};

export const fetchFoodItems = async () => {
  try {
    const response = await axiosInstance.get(`${API}/api/my-foods`);
    if (response && response.data) {
      return response.data.data;
    }
    throw new Error('Unexpected response structure');
  } catch (error) {
    console.error('Error fetching food items:', error.response?.data?.message || error.message);
    throw new Error('Failed to fetch food items');
  }
};

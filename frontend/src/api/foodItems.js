import axios from 'axios';
import { API } from './consts';

export const createFoodItem = async (data) => {
  try {
    const response = await axios.post(`${API}/api/create-food`, data);

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
    const response = await axios.get(`${API}/api/my-foods`);

    if (response) {
      return response.data;
    }

    throw new Error('Unexpected response structure');
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch food items');
  }
};

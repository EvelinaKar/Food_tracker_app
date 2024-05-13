import axiosInstance from './axios';
import { API } from './consts';

export const createFoodItem = async (data) => {
  try {
    const response = await axiosInstance.post(`${API}/api/create-food`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch food items');
  }
};

// export const createFoodItem = async (data) => {
//   try {
//     const response = await axiosInstance.post(`${API}/api/create-food`, data);

//     if (response) {
//       return response.data;
//     }

//   } catch (error) {
//     throw new Error(error.response?.data?.message || error.message || 'Failed to create food item');
//   }
// };

export const fetchFoodItems = async () => {
  try {
    const response = await axiosInstance.get(`${API}/api/my-foods`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch food items');
  }
};

import axiosInstance from './axios';
import { API } from './consts';

export const createMeal = async (data) => {
  try {
    const response = await axiosInstance.post(`${API}/api/create-meal`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create meal.');
  }
};

export const fetchMeals = async () => {
  try {
    const response = await axiosInstance.get(`${API}/api/my-meals`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch meals.');
  }
};

export const fetchMealItem = async (mealId) => {
  if (!mealId) {
    throw new Error('Meal ID is required to fetch meal details.');
  }
  try {
    const response = await axiosInstance.get(`${API}/api/view-meal/${mealId}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch meal details.');
  }
};

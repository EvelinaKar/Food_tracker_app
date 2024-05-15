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

export const fetchMealItem = async (id) => {
  if (!id) {
    throw new Error('Meal ID is required to fetch meal details.');
  }
  try {
    const response = await axiosInstance.get(`${API}/api/meal/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch meal details.');
  }
};

export const updateMeal = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${API}/api/update-meal/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update meal.');
  }
};

export const deleteMeal = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API}/api/delete-meal/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete meal.');
  }
};

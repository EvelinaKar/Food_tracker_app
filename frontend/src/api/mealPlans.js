import axiosInstance from './axios';
import { API } from './consts';

export const fetchMealPlans = async () => {
  try {
    const response = await axiosInstance.get(`${API}/api/my-meal-plans`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch meal plans.');
  }
};

export const fetchMealPlan = async (id) => {
  try {
    const response = await axiosInstance.get(`${API}/api/meal-plan/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch meal plan details.');
  }
};

export const createMealPlan = async (data) => {
  try {
    const response = await axiosInstance.post(`${API}/api/create-meal-plan`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create meal plan.');
  }
};

export const updateMealPlan = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${API}/api/update-meal-plan/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update meal plan.');
  }
};

export const deleteMealPlan = async (id) => {
  try {
    await axiosInstance.delete(`${API}/api/delete-meal-plan/${id}`);
  } catch (error) {
    throw new Error('Failed to delete meal plan.');
  }
};

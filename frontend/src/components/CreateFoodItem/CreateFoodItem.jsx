import React, { useState, useContext } from 'react';
import { createFoodItem } from '../../api/foodItems';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './CreateFoodItem.module.scss';

const CreateFoodForm = () => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    valuesPer: '',
    kcal: '',
    fat: '',
    carbs: '',
    protein: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (token) {
      try {
        console.log('Token used for request:', token);
        const response = await createFoodItem(formData, token);
        console.log(response);
        alert('Food item added successfully!');
      } catch (error) {
        console.error('Error creating food item:', error);
        alert('Failed to add food item. Please check the console for more info.');
      }
    } else {
      alert('No authentication token found. Please log in.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create New Food Item</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Values Per (e.g., 100g):
          <input type="text" name="valuesPer" value={formData.valuesPer} onChange={handleChange} required />
        </label>
        <label>
          Calories:
          <input type="number" name="kcal" value={formData.kcal} onChange={handleChange} required />
        </label>
        <label>
          Fat (grams):
          <input type="number" name="fat" value={formData.fat} onChange={handleChange} required />
        </label>
        <label>
          Carbs (grams):
          <input type="number" name="carbs" value={formData.carbs} onChange={handleChange} required />
        </label>
        <label>
          Protein (grams):
          <input type="number" name="protein" value={formData.protein} onChange={handleChange} required />
        </label>
        <button type="submit">Add Food Item</button>
      </form>
    </div>
  );
};

export default CreateFoodForm;

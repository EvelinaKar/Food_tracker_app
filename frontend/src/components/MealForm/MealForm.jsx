import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { createMeal, fetchMealItem, updateMeal } from '../../api/mealsItems';
import { fetchFoodItems } from '../../api/foodItems';
import { AuthContext } from '../../contexts/AuthContext';
import { ROUTES } from '../../routes/consts';
import styles from './MealForm.module.scss';
import Button from '../Button/Button';

const MealForm = ({ mode }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = mode === 'edit';

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: [],
    calories: '',
    servings: '',
    photo: '',
  });
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFoodId, setSelectedFoodId] = useState('');
  const [error, setError] = useState('');
  const units = ['g', 'kg', 'ml', 'l', 'tbsp', 'tsp', 'cup'];

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(ROUTES.LOGIN);
      return;
    }

    const loadFoodItems = async () => {
      try {
        const items = await fetchFoodItems();
        setFoodItems(items);
      } catch (error) {
        console.error('Failed to fetch foods:', error);
        setError('Failed to fetch foods');
      }
    };

    const loadMealData = async () => {
      if (isEditMode && id) {
        try {
          const meal = await fetchMealItem(id);
          setFormData(meal);
        } catch (error) {
          console.error('Failed to fetch meal data:', error);
          setError('Failed to fetch meal data');
        }
      }
    };

    loadFoodItems();
    loadMealData();
  }, [isLoggedIn, navigate, isEditMode, id]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddIngredient = () => {
    const food = foodItems.find((item) => item._id === selectedFoodId);
    if (food) {
      const newIngredient = {
        id: food._id,
        name: food.name,
        amount: '100',
        unit: 'g',
      };
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, newIngredient],
      });
      setSelectedFoodId('');
    }
  };

  const updateIngredient = (index, field, value) => {
    const updatedIngredients = formData.ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [field]: value };
      }
      return ingredient;
    });
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const removeIngredient = (index) => {
    const filteredIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: filteredIngredients });
  };

  const handleSubmit = async (event, stayOnPage = false) => {
    event.preventDefault();
    if (!isLoggedIn) {
      alert('Please log in to add meals.');
      navigate(ROUTES.LOGIN);
      return;
    }

    try {
      if (isEditMode && id) {
        const response = await updateMeal(id, formData);
        console.log('Meal updated:', response);
        alert('Meal updated successfully!');
      } else {
        const response = await createMeal(formData);
        console.log('Meal added:', response);
        alert('Meal added successfully!');
      }

      if (!stayOnPage) {
        navigate(ROUTES.MY_MEALS);
      } else {
        setFormData({
          name: '',
          description: '',
          ingredients: [],
          calories: '',
          servings: '',
          photo: '',
        });
      }
    } catch (error) {
      console.error('Error creating/updating meal:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>{mode === 'edit' ? 'Edit Meal' : 'Create New Meal'}</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={(e) => handleSubmit(e, false)} className={styles.form}>
        <label>
          <span>Name:</span>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          <span>Description:</span>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <div className={styles.ingredientsContainer}>
          <label className={styles.ingredientsHeader}>Ingredients:</label>
          <select value={selectedFoodId} onChange={(e) => setSelectedFoodId(e.target.value)} className={styles.selectDropdown}>
            <option value="">Select a food item</option>
            {foodItems.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <Button onClick={handleAddIngredient}>Add Ingredient</Button>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className={styles.ingredientRow}>
              <button onClick={() => removeIngredient(index)} className={styles.removeButton}>
                &times;
              </button>
              {ingredient.name}
              <input
                type="number"
                placeholder="Amount"
                value={ingredient.amount}
                onChange={(e) => updateIngredient(index, 'amount', e.target.value)}
                className={styles.input}
              />
              <select value={ingredient.unit} onChange={(e) => updateIngredient(index, 'unit', e.target.value)} className={styles.select}>
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <label>
          <span>Calories per Serving:</span>
          <input type="number" name="calories" value={formData.calories} onChange={handleChange} required />
        </label>
        <label>
          <span>Servings:</span>
          <input type="number" name="servings" value={formData.servings} onChange={handleChange} required />
        </label>
        <label>
          <span>Photo URL:</span>
          <input type="text" name="photo" value={formData.photo} onChange={handleChange} />
        </label>
        <Button type="submit">{isEditMode ? 'Update Meal' : 'Add Meal and View List'}</Button>
        {!isEditMode && (
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e, true);
            }}
          >
            Add Another Meal
          </Button>
        )}
      </form>
    </div>
  );
};

MealForm.propTypes = {
  mode: PropTypes.string,
};

export default MealForm;

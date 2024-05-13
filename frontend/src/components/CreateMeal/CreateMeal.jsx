import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { createMeal } from '../../api/mealsItems';
import { fetchFoodItems } from '../../api/foodItems';
import { AuthContext } from '../../contexts/AuthContext';
import { ROUTES } from '../../routes/consts';
import styles from './CreateMeal.module.scss';
import Button from '../Button/Button';

const CreateMealForm = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
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

    loadFoodItems();
  }, [isLoggedIn, navigate]);

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
        amount: '',
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
      const response = await createMeal(formData);
      console.log('Meal added:', response);
      alert('Meal added successfully!');
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
      console.error('Error creating meal:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create New Meal</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={(e) => handleSubmit(e, false)} className={styles.form}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <div>
          <label>Ingredients:</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className={styles.ingredientRow}>
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
              <button onClick={() => removeIngredient(index)} className={styles.removeButton}>
                X
              </button>
            </div>
          ))}
          <select value={selectedFoodId} onChange={(e) => setSelectedFoodId(e.target.value)} className={styles.selectDropdown}>
            <option value="">Select a food item</option>
            {foodItems.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <Button onClick={handleAddIngredient}>Add Ingredient</Button>
        </div>
        <label>
          Calories per Serving:
          <input type="number" name="calories" value={formData.calories} onChange={handleChange} required />
        </label>
        <label>
          Servings:
          <input type="number" name="servings" value={formData.servings} onChange={handleChange} required />
        </label>
        <label>
          Photo URL:
          <input type="text" name="photo" value={formData.photo} onChange={handleChange} />
        </label>
        <Button type="submit">Add Meal and View List</Button>
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(e, true);
          }}
        >
          Add Another Meal
        </Button>
      </form>
    </div>
  );
};

CreateMealForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.object),
    calories: PropTypes.string,
    servings: PropTypes.string,
    photo: PropTypes.string,
  }),
  onFormSubmit: PropTypes.func,
};

export default CreateMealForm;

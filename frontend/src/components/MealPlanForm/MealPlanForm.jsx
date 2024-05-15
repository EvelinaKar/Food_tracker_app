import { useState, useContext, useEffect } from 'react';
import { ROUTES } from '../../routes/consts';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMeals } from '../../api/mealsItems';
import { createMealPlan, fetchMealPlan, updateMealPlan } from '../../api/mealPlans';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './MealPlanForm.module.scss';
import Button from '../Button/Button';

const MealPlanForm = ({ mode }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = mode === 'edit';

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    days: [{ meals: { breakfast: [], lunch: [], dinner: [] }, notes: '' }],
  });
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      setError('Please log in to create or edit a meal plan.');
      navigate(ROUTES.LOGIN);
      return;
    }

    const loadMeals = async () => {
      try {
        const result = await fetchMeals();
        setMeals(result);
      } catch (err) {
        console.error(err);
      }
    };

    const loadMealPlanData = async () => {
      if (isEditMode && id) {
        try {
          const mealPlan = await fetchMealPlan(id);
          setFormData(mealPlan);
        } catch (error) {
          console.error('Failed to fetch meal plan data:', error);
        }
      }
    };

    loadMeals();
    loadMealPlanData();
  }, [isLoggedIn, navigate, isEditMode, id]);

  const handleChange = (event, field) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleAddDay = () => {
    setFormData({
      ...formData,
      days: [...formData.days, { meals: { breakfast: [], lunch: [], dinner: [] }, notes: '' }],
    });
  };

  const handleMealChange = (dayIndex, mealTime, selectedOptions) => {
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].meals[mealTime] = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, days: updatedDays });
  };

  const handleNotesChange = (dayIndex, event) => {
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].notes = event.target.value;
    setFormData({ ...formData, days: updatedDays });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      alert('Please log in to create a meal plan.');
      navigate(ROUTES.LOGIN);
      return;
    }

    try {
      if (isEditMode && id) {
        await updateMealPlan(id, formData);
        alert('Meal plan updated successfully!');
      } else {
        await createMealPlan(formData);
        alert('Meal plan created successfully!');
      }
      navigate('/my-meal-plans');
    } catch (error) {
      console.error('Error creating/updating meal plan:', error);
      setError('Failed to create/update meal plan.');
    }
  };

  const mealOptions = meals.map((meal) => ({ value: meal._id, label: meal.name }));

  return (
    <div className={styles.container}>
      <h2>{isEditMode ? 'Edit Meal Plan' : 'Create New Meal Plan'}</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          <span>Name:</span>
          <input type="text" name="name" value={formData.name} onChange={(e) => handleChange(e, 'name')} required />
        </label>
        <label>
          <span>Description:</span>
          <textarea name="description" value={formData.description} onChange={(e) => handleChange(e, 'description')} />
        </label>
        {formData.days.map((day, index) => (
          <div key={index} className={styles.daySection}>
            <h3>Day {index + 1}</h3>
            {['breakfast', 'lunch', 'dinner'].map((mealTime) => (
              <label key={mealTime}>
                <span>{mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}:</span>
                <Select
                  isMulti
                  options={mealOptions}
                  value={mealOptions.filter((option) => day.meals[mealTime].includes(option.value))}
                  onChange={(selectedOptions) => handleMealChange(index, mealTime, selectedOptions)}
                  className={styles.selectDropdown}
                />
              </label>
            ))}
            <label>
              <span>Notes:</span>
              <textarea value={day.notes} onChange={(e) => handleNotesChange(index, e)} className={styles.notesInput} />
            </label>
          </div>
        ))}
        <Button type="button" onClick={handleAddDay} className={styles.addButton}>
          Add Next Day
        </Button>
        <Button type="submit">{isEditMode ? 'Update Meal Plan' : 'Create Meal Plan'}</Button>
      </form>
    </div>
  );
};

MealPlanForm.propTypes = {
  mode: PropTypes.string,
};

export default MealPlanForm;

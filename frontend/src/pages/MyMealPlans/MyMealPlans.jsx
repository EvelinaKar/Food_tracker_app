import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMealPlans, deleteMealPlan } from '../../api/mealPlans';
import { fetchMeals } from '../../api/mealsItems';
import { AuthContext } from '../../contexts/AuthContext';
import { ROUTES } from '../../routes/consts';
import Button from '../../components/Button/Button';
import styles from './MyMealPlans.module.scss';

const MyMealPlans = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState('');
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      setError('Please log in to see your meal plans.');
      navigate(ROUTES.LOGIN);
      return;
    }

    const getMealPlans = async () => {
      try {
        const mealPlansResult = await fetchMealPlans();
        setMealPlans(mealPlansResult);
      } catch (err) {
        setError('Failed to fetch meal plans');
        console.error(err);
      }
    };

    const getMeals = async () => {
      try {
        const mealsResult = await fetchMeals();
        setMeals(mealsResult);
      } catch (err) {
        setError('Failed to fetch meals');
        console.error(err);
      }
    };

    getMealPlans();
    getMeals();
  }, [isLoggedIn, navigate]);

  const handleCreateMealPlanClick = () => {
    navigate(ROUTES.CREATE_MEAL_PLAN);
  };

  const handleDeleteMealPlan = async (id) => {
    if (window.confirm('Are you sure you want to delete this meal plan?')) {
      try {
        await deleteMealPlan(id);
        setMealPlans(mealPlans.filter((plan) => plan._id !== id));
      } catch (err) {
        console.error('Failed to delete meal plan:', err);
      }
    }
  };

  const getMealName = (mealId) => {
    const meal = meals.find((meal) => meal._id === mealId);
    return meal ? meal.name : mealId;
  };

  const renderDay = (day, index) => {
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return (
      <div key={index} className={styles.dayCard}>
        <h3>{dayNames[index]}</h3>
        {['breakfast', 'lunch', 'dinner'].map((mealTime) => (
          <div key={mealTime} className={styles.mealTime}>
            <strong>{mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}:</strong>
            <div className={styles.mealNames}>
              {day.meals[mealTime].map((mealId) => (
                <span key={mealId}>{getMealName(mealId)}</span>
              ))}
            </div>
          </div>
        ))}
        <div className={styles.notes}>
          <strong>Notes:</strong>
          <p>{day.notes}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Meal Plans</h1>
        <Button onClick={handleCreateMealPlanClick}>Add New Meal Plan</Button>
      </div>
      {error && <p>{error}</p>}
      <div className={styles.mealPlansContainer}>
        {mealPlans.length > 0 ? (
          mealPlans.map((plan) => (
            <div key={plan._id} className={styles.mealPlanCard}>
              <div className={styles.mealPlanHeader}>
                <h2>{plan.name}</h2>
                <div className={styles.buttonsContainer}>
                  <Button onClick={() => navigate(`/update-meal-plan/${plan._id}`)}>Edit</Button>
                  <Button onClick={() => handleDeleteMealPlan(plan._id)}>Delete</Button>
                </div>
              </div>
              <p>{plan.description}</p>
              <div className={styles.daysContainer}>{plan.days.map((day, index) => renderDay(day, index))}</div>
            </div>
          ))
        ) : (
          <p className={styles.noData}>No meal plans found. Add some!</p>
        )}
      </div>
    </div>
  );
};

export default MyMealPlans;

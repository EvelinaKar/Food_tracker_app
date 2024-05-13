import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { fetchMealItem } from '../../api/mealsItems';
import { ROUTES } from '../../routes/consts';
import styles from './ViewMealCard.module.scss';
import Button from '../Button/Button';

const ViewMealCard = () => {
  const { mealId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      alert('Please log in to view meal details.');
      navigate(ROUTES.LOGIN);
      return;
    }

    const fetchMeal = async () => {
      setIsLoading(true);
      try {
        const mealData = await fetchMealItem(mealId);
        setMeal(mealData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeal();
  }, [mealId, isLoggedIn, navigate]);

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!meal) return <div className={styles.noData}>No meal data available.</div>;

  return (
    <div className={styles.container}>
      {meal.photo && <img src={meal.photo} alt={meal.name} className={styles.mealPhoto} />}
      <h2 className={styles.mealName}>{meal.name}</h2>
      <p className={styles.description}>{meal.description}</p>
      <div className={styles.ingredients}>
        <h3>Ingredients:</h3>
        <ul>
          {meal.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name} - {ingredient.amount} {ingredient.unit}
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.calories}>Calories: {meal.calories}</p>
      <p className={styles.servings}>Servings: {meal.servings}</p>
      <Button onClick={() => navigate(ROUTES.MY_MEALS)}>Back to Meals</Button>
    </div>
  );
};

export default ViewMealCard;

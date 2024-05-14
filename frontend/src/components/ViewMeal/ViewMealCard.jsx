import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { fetchMealItem } from '../../api/mealsItems';
import { ROUTES } from '../../routes/consts';
import styles from './ViewMealCard.module.scss';
import Button from '../Button/Button';

const ViewMealCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeal = async () => {
      if (!isLoggedIn) {
        alert('Please log in to view meal details.');
        navigate(ROUTES.LOGIN);
        return;
      }

      try {
        const response = await fetchMealItem(id);
        setMeal(response);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeal();
  }, [id, isLoggedIn, navigate]);

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!meal) return <div className={styles.noData}>No meal data available.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button onClick={() => navigate(ROUTES.MY_MEALS)}>Back to Meals</Button>
      </div>
      <div className={styles.mealContainer}>
        <span className={styles.imgContainer}>{meal.photo && <img src={meal.photo} alt={meal.name} className={styles.mealPhoto} />}</span>
        <span className={styles.infoContainer}>
          <h2 className={styles.mealName}>{meal.name}</h2>
          <span className={styles.calories}>🔥 {meal.calories}kcal</span>
          <span>👤 {meal.servings}</span>
          <div className={styles.ingredients}>
            <h3>Ingredients:</h3>
            <ul>
              {meal.ingredients.map((ingredient, index) => (
                <li key={index}>
                  ○ {ingredient.name} - {ingredient.amount} {ingredient.unit}
                </li>
              ))}
            </ul>
          </div>
        </span>
      </div>
      <h3>Instructions:</h3>
      <p className={styles.description}>{meal.description}</p>
      <div className={styles.buttonContainer}>
        <Button className={styles.secondaryButton} onClick={() => navigate(`/update-meal/${id}`)}>
          Edit Meal
        </Button>
        <Button className={styles.secondaryButton} onClick={() => navigate(ROUTES.MY_MEALS)}>
          Delete Meal
        </Button>
      </div>
    </div>
  );
};

export default ViewMealCard;

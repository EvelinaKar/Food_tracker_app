import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { fetchMeals } from '../../api/mealsItems';
import MealItem from '../../components/MealCard/MealItemCard';
import { ROUTES } from '../../routes/consts';
import Button from '../../components/Button/Button';
import styles from './MyMeals.module.scss';

const MyMeals = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState('');
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      setError('Please log in to see your meals.');
      navigate(ROUTES.LOGIN);
      return;
    }

    const getMeals = async () => {
      try {
        const result = await fetchMeals();
        setMeals(result);
      } catch (err) {
        setError('Failed to fetch meals');
        console.error(err);
      }
    };

    getMeals();
  }, [isLoggedIn, navigate]);

  const handleCreateMealClick = () => {
    navigate(ROUTES.CREATE_MEAL);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Meals</h1>
        <Button onClick={handleCreateMealClick}>Add New Meal</Button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.mealsCardsContainer}>
        {meals.length > 0 ? (
          meals.map((meal) => <MealItem key={meal._id} meal={meal} />)
        ) : (
          <p className={styles.noData}>No meals found. Add some!</p>
        )}
      </div>
    </div>
  );
};

export default MyMeals;

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMealPlans } from '../../api/mealPlans';
import { AuthContext } from '../../contexts/AuthContext';
import { ROUTES } from '../../routes/consts';
import Button from '../../components/Button/Button';
import styles from './MyMealPlans.module.scss';

const MyMealPlans = () => {
  const [mealPlans, setMealPlans] = useState([]);
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
        const result = await fetchMealPlans();
        setMealPlans(result);
      } catch (err) {
        console.error(err);
      }
    };

    getMealPlans();
  }, [isLoggedIn, navigate]);

  const handleCreateMealPlanClick = () => {
    navigate(ROUTES.CREATE_MEAL_PLAN);
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
              <h2>{plan.name}</h2>
              <p>{plan.description}</p>
              <Button onClick={() => navigate(`/meal-plan/${plan._id}`)}>View Plan</Button>
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

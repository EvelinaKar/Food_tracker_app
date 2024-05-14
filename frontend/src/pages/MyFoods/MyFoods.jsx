import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFoodItems } from '../../api/foodItems';
import FoodItem from '../../components/FoodItem/FoodItem';
import { AuthContext } from '../../contexts/AuthContext';
import { ROUTES } from '../../routes/consts';
import Button from '../../components/Button/Button';
import styles from './MyFoods.module.scss';

const MyFoods = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState('');
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      setError('Please log in to see your foods.');
      navigate(ROUTES.LOGIN);
      return;
    }

    const getFoodItems = async () => {
      try {
        const result = await fetchFoodItems();
        setFoodItems(result);
      } catch (err) {
        setError('Failed to fetch food items');
        console.error(err);
      }
    };

    getFoodItems();
  }, [isLoggedIn, navigate]);

  const handleCreateFoodClick = () => {
    navigate(ROUTES.CREATE_FOOD);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Food</h1>
        <Button onClick={handleCreateFoodClick}>Add New Food</Button>
      </div>
      {error && <p>{error}</p>}
      <div className={styles.foodItemsContainer}>
        {foodItems.length > 0 ? (
          foodItems.map((item) => <FoodItem key={item._id} foodItem={item} />)
        ) : (
          <p className={styles.noData}>No food found. Add some!</p>
        )}
      </div>
    </div>
  );
};

export default MyFoods;

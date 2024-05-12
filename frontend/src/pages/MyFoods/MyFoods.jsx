import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFoodItems } from '../../api/foodItems';
import FoodItem from '../../components/FoodItem/FoodItem';
import { AuthContext } from '../../contexts/AuthContext';
import { ROUTES } from '../../routes/consts';
import Button from '../../components/Button/Button';

const MyFoods = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState('');
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      setError('Please log in to see your foods.');
      return;
    }

    const getFoodItems = async () => {
      try {
        const data = await fetchFoodItems();
        console.log('Fetched data:', data);
        setFoodItems(data.data);
      } catch (err) {
        setError('Failed to fetch food items');
        console.error(err);
      }
    };

    getFoodItems();
  }, [isLoggedIn]);

  const handleCreateFoodClick = () => {
    navigate(ROUTES.CREATE_FOOD);
  };

  return (
    <div>
      <h1>My Food Items</h1>
      {error && <p>{error}</p>}
      <Button onClick={handleCreateFoodClick}>Create Food</Button>
      {foodItems.length > 0 ? (
        foodItems.map((item) => <FoodItem key={item._id} foodItem={item.name} />)
      ) : (
        <p>No food items found. Add some!</p>
      )}
    </div>
  );
};

export default MyFoods;

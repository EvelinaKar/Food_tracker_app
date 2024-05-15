import PropTypes from 'prop-types';
import styles from './FoodItem.module.scss';
import { deleteFoodItem } from '../../api/foodItems';

const FoodItem = ({ foodItem, onDelete }) => {
  if (!foodItem) return <div>No foods data available.</div>;

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this food?');
    if (!confirmed) {
      return;
    }

    try {
      await deleteFoodItem(foodItem._id);
      onDelete(foodItem._id);
    } catch (error) {
      console.error('Failed to delete food item:', error);
      alert('Failed to delete food item.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>{foodItem.name}</h2>
      <div className={styles.details}>
        <span>Values per: {foodItem.valuesPer}g</span>
        <span>🔥 {foodItem.kcal}kcal</span>
        <span>Fat: {foodItem.fat}g</span>
        <span>Carbs: {foodItem.carbs}g</span>
        <span>Protein: {foodItem.protein}g</span>
      </div>
      <button className={styles.deleteButton} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

FoodItem.propTypes = {
  foodItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    kcal: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
    valuesPer: PropTypes.number.isRequired,
  }),
  onDelete: PropTypes.func.isRequired,
};

export default FoodItem;

import PropTypes from 'prop-types';
import styles from './FoodItem.module.scss';

const FoodItem = ({ foodItem }) => {
  if (!foodItem) return <div>No foods data available.</div>;

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
    </div>
  );
};

FoodItem.propTypes = {
  foodItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    kcal: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
    valuesPer: PropTypes.number.isRequired,
  }),
};

export default FoodItem;

import PropTypes from 'prop-types';

const FoodItem = ({ foodItem }) => {
  if (!foodItem) return <div>No foods data available.</div>;

  return (
    <div className="food-item">
      <h2>{foodItem.name}</h2>
      <ul>
        <li>Values Per: {foodItem.valuesPer} grams</li>
        <li>Calories: {foodItem.kcal} kcal</li>
        <li>Fat: {foodItem.fat} grams</li>
        <li>Carbohydrates: {foodItem.carbs} grams</li>
        <li>Protein: {foodItem.protein} grams</li>
      </ul>
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
import styles from './MealItemCard.module.scss';
import PropTypes from 'prop-types';

const MealItemCard = ({ meal, onClick }) => {
  return (
    <div className={styles.mealItem} onClick={() => onClick(meal)}>
      {meal.photo && <img src={meal.photo} alt={meal.name} className={styles.mealPhoto} />}
      <div className={styles.details}>
        <p className={(styles.mealServings, styles.detailItem)}>Servings: {meal.servings}</p>
        <p className={(styles.mealCalories, styles.detailItem)}>Calories per Serving:{meal.calories}</p>
      </div>
      <h2 className={styles.mealName}>{meal.name}</h2>
    </div>
  );
};

MealItemCard.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    servings: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    photo: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MealItemCard;

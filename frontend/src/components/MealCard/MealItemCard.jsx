import styles from './MealItemCard.module.scss';
import PropTypes from 'prop-types';

const MealItemCard = ({ meal, onClick }) => {
  return (
    <div className={styles.mealItemCard} onClick={() => onClick(meal)}>
      {meal.photo && <img src={meal.photo} alt={meal.name} className={styles.mealPhoto} />}
      <h2 className={styles.mealName}>{meal.name}</h2>
    </div>
  );
};

MealItemCard.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MealItemCard;

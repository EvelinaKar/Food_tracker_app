import styles from './MealItemCard.module.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/consts';

const MealItemCard = ({ meal }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`${ROUTES.MEAL.replace(':id', meal._id)}`);
  };

  return (
    <div className={styles.mealItem} onClick={handleCardClick}>
      {meal.photo && <img src={meal.photo} alt={meal.name} className={styles.mealPhoto} />}
      <div className={styles.details}>
        <span className={(styles.mealServings, styles.detailItem)}>👤 {meal.servings}</span>
        <span className={(styles.mealCalories, styles.detailItem)}>🔥 {meal.calories}kcal</span>
      </div>
      <h2 className={styles.mealName}>{meal.name}</h2>
    </div>
  );
};

MealItemCard.propTypes = {
  meal: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    servings: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    photo: PropTypes.string,
  }),
};

export default MealItemCard;

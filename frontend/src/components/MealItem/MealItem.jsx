import styles from './MealItem.module.scss';
import classNames from 'classnames';
import React from 'react';

const Meal = ({ meal }) => {
  if (!foodItem) return <div>No meals data available.</div>;

  return (
    <div className="meal-item">
      <h2>{meal.name}</h2>
      <ol>
        Ingredients:
        {meal.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name} - {ingredient.amount} {ingredient.unit}
          </li>
        ))}
      </ol>
      <p>Description: {meal.description}</p>
      <p>Calories: {meal.calories}</p>
      <p>Servings: {meal.servings}</p>
    </div>
  );
};

export default Meal;

import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { createFoodItem } from '../../api/foodItems';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './CreateFoodItem.module.scss';
import Button from '../../components/Button/Button';
import { ROUTES } from '../../routes/consts';

const CreateFoodForm = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    valuesPer: '',
    kcal: '',
    fat: '',
    carbs: '',
    protein: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event, stayOnPage = false) => {
    event.preventDefault();
    if (!isLoggedIn) {
      alert('Please log in to add food.');
      navigate(ROUTES.LOGIN);
      return;
    }

    try {
      const response = await createFoodItem(formData);
      console.log('Food added:', response);
      alert('Food added successfully!');
      if (!stayOnPage) {
        navigate(ROUTES.MY_FOODS);
      } else {
        setFormData({
          name: '',
          valuesPer: '',
          kcal: '',
          fat: '',
          carbs: '',
          protein: '',
        });
      }
    } catch (error) {
      console.error('Error creating food:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create New Food Item</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={(e) => handleSubmit(e, false)} className={styles.form}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Values per (grams):
          <input type="number" name="valuesPer" value={formData.valuesPer} onChange={handleChange} required />
        </label>
        <label>
          Calories:
          <input type="number" name="kcal" value={formData.kcal} onChange={handleChange} required />
        </label>
        <label>
          Fat (grams):
          <input type="number" name="fat" value={formData.fat} onChange={handleChange} required />
        </label>
        <label>
          Carbs (grams):
          <input type="number" name="carbs" value={formData.carbs} onChange={handleChange} required />
        </label>
        <label>
          Protein (grams):
          <input type="number" name="protein" value={formData.protein} onChange={handleChange} required />
        </label>
        <Button type="submit">Add Food and View List</Button>
        <Button type="button" onClick={(e) => handleSubmit(e, true)}>
          Add Another Food
        </Button>
      </form>
    </div>
  );
};

CreateFoodForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    valuesPer: PropTypes.string,
    kcal: PropTypes.string,
    fat: PropTypes.string,
    carbs: PropTypes.string,
    protein: PropTypes.string,
  }),
  onFormSubmit: PropTypes.func,
};

export default CreateFoodForm;

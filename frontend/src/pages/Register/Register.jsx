import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../../routes/consts';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './Register.module.scss';
import { registerUser } from '../../api/auth';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!formData.name) {
      formIsValid = false;
      errors['name'] = 'Username cannot be empty!';
    }

    if (!formData.email) {
      formIsValid = false;
      errors['email'] = 'Email cannot be empty!';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      errors['email'] = 'Email is not valid!';
    }

    if (formData.password.length < 6) {
      formIsValid = false;
      errors['password'] = 'Password must be at least 6 characters!';
    }

    if (formData.password !== formData.confirmPassword) {
      formIsValid = false;
      errors['confirmPassword'] = 'Passwords do not match!';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      console.log('Registered:', data);
      alert('Registration Successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : 'No response');
      setErrors({
        ...errors,
        apiError: error.response ? error.response.data.message : 'Registration failed.',
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formTitle}>Register</div>
      <form onSubmit={handleSubmit} className={styles.form}>
        {errors.name && <span className={styles.error}>{errors.name}</span>}
        <Input type="text" name="name" placeholder="Username" value={formData.name} onChange={handleChange} className={styles.fullWidth} />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
        <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={styles.fullWidth} />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={styles.fullWidth}
        />
        {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={styles.fullWidth}
        />
        <Button type="submit" className={styles.submitButton}>
          Register
        </Button>
        <Link to={ROUTES.LOGIN}>
          <div className={styles.loginLink}>Already have an account? Login</div>
        </Link>
      </form>
    </div>
  );
}

export default Register;

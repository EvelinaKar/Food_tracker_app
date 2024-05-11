import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { ROUTES } from '../../routes/consts';
import styles from './Login.module.scss';
import { loginUser } from '../../api/auth';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!formData.email) {
      formIsValid = false;
      errors['email'] = 'Email cannot be empty';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      errors['email'] = 'Email is not valid';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await loginUser(formData);
      if (response.token) {
        console.log('Login successful:', response);
        localStorage.setItem('authToken', response.token);
        navigate(ROUTES.HOME);
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : 'No response');
      setErrors({
        ...errors,
        apiError: error.response ? error.response.data.message : 'Login failed.',
      });
    }
  };

  return (
    <div>
      <div className={styles.formContainer}>
        <div className={styles.formTitle}>Login</div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.fullWidth}
            required
          />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={styles.fullWidth}
            required
          />
          <Button type="submit" className={styles.loginButton}>
            Log In
          </Button>
          <Link to={ROUTES.REGISTER}>
            <div className={styles.registerLink}>Do not have an account? Register</div>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import Logo from '../../assets/logo.png';
import styles from './NavigationBar.module.scss';
import { navigationBarLinks } from '../../routes/consts';

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={Logo} alt="Logo" />
      </div>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
        <button className={styles.closeButton} onClick={toggleMenu}>
          &times;
        </button>
        {navigationBarLinks.map((link) => (
          <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.title}
          </Link>
        ))}
        <Button onClick={handleLogout}>Log out</Button>
      </nav>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </header>
  );
};

export default NavigationBar;

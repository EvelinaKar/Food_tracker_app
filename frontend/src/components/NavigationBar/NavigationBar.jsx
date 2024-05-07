import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Logo from "../../assets/logo.png";
import styles from "./NavigationBar.module.scss";
import { navigationBarLinks } from "../../routes/consts";

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={Logo} alt="Logo" />
      </div>
      <nav className={styles.nav}>
        {navigationBarLinks.map((link) => (
          <Link key={link.path} to={link.path}>
            {link.title}
          </Link>
        ))}
      </nav>
      <Button onClick={handleLogout}>Log out</Button>
    </header>
  );
};

export default NavigationBar;

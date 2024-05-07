import PropTypes from "prop-types";
import styles from "./AuthLayout.module.scss";

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.background} />
      <div className={styles.shadowLayer} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;

import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Button.module.scss";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button className={classNames(styles.button, className)} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;

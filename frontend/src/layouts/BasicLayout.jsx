import PropTypes from 'prop-types';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import styles from './BasicLayout.module.scss';

const BasicLayout = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <div className={styles.container}>{children}</div>
    </>
  );
};

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;

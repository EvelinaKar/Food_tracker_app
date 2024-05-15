import PropTypes from 'prop-types';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import styles from './BasicLayout.module.scss';

const BasicLayout = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  );
};

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;

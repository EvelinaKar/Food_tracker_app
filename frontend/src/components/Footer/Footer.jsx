import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.projectName}>PlatePerfect</p>
        <p className={styles.description}>Plan and track your meals effortlessly.</p>
        <div className={styles.links}></div>
      </div>
      <p className={styles.copyright}>&copy; 2024 PlatePerfect. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

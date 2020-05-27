import React from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ progress }) => (
  <div className={styles.progressBar}>
    <div className={styles.progress} style={{ width: progress }}>
      <span>{progress}</span></div>
  </div>
)

export default ProgressBar;

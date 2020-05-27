import React from 'react';
import { ProgressBar } from '../ProgressBar';
import styles from './Result.module.css';

const Result = ({ options, answer }) => {
  const total = options.reduce((total, current) => total + current.votes, 0);
  return (<div className={styles.content}>
    <h2 className={styles.title}>Results:</h2>
    <div className={styles.options}>
      {options.map((option) => {
        const percent = (option.votes * 100 / total);
        const progress = percent.toFixed(Math.ceil(percent % 1)) + "%";
        const hasVoted = option.id === answer;
        return (
          <div key={option.id} className={`${styles.option} ${hasVoted ? styles.active : null}`}>
            <p className={styles.label}>Would you rather {option.label}?</p>
            <div className={styles.bar}>
              <ProgressBar progress={progress} />
            </div>
            {hasVoted && <div className={styles.badge}><p>Your vote</p></div>}
            <div className={styles.numbers}> {option.votes} out of {total} votes </div>
          </div>)
      })}
    </div>
  </div>)
};


export default Result;

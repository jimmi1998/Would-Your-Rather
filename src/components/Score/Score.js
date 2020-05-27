import React from 'react';
import { Avatar } from '../_common/Avatar';
import styles from './Score.module.css';
import { ordinal_suffix_of } from '../../utils';

const rankClass = ["gold", "silver", "bronze", "unranked"];

const Score = (user) => (
  <div className={styles.score}>
    <div className={styles.content}>
      <div className={styles.avatar} >
        <Avatar avatarUrl={user.avatarURL} />
      </div>
      <div className={styles.details}>
        <h3>{user.name}</h3>
        <p>Answered questions: <span>{user.answered}</span></p>
        <hr />
        <p>Created questions: <span>{user.created}</span></p>
      </div>
      <div className={styles.scorecard}>
        <div>
          <h3>Score</h3>
        </div>
        <div className={styles.card}>
          <span>{user.score}</span>
        </div>
      </div>
    </div>
    <div className={`${styles.cup} ${styles[rankClass[user.rank - 1]]}`}></div>
    <div className={styles.rank}> {ordinal_suffix_of(user.rank)}</div>
  </div>
)

export default Score;

import React from 'react';
import { Score } from '../Score';
import { connect } from 'react-redux';
import styles from './Leaderboard.module.css';

const Leaderboard = ({ leaderboard }) => (
  <div className={styles.leaderboard} >
    {leaderboard.map((user) => <Score key={user.id} {...user} />)}
  </div >
);

const mapStateToProps = ({ users }) => {
  return {
    leaderboard: users.allIds.map(id => {
      const { answers, questions, ...user } = users.byId[id];
      return {
        ...user,
        created: questions.length,
        answered: Object.keys(answers).length,
        score: questions.length + Object.keys(answers).length,
      };
    })
      .sort((a, b) => b.score - a.score)
      .map((user, index) => ({
        ...user,
        rank: index + 1
      }))
  }
}

export default connect(mapStateToProps)(Leaderboard);

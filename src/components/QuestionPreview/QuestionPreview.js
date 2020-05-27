import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './QuestionPreview.module.css';
import Avatar from '../_common/Avatar/Avatar';

const QuestionPreview = ({ id, author, optionOne }) => (
  <div className={styles.questionPreview}>
    <div>
      <h4 className={styles.title}>{author.name} asks:</h4>
    </div>
    <div className={styles.content}>
      <div className={styles.avatar}>
        <Avatar avatarUrl={author.avatarURL} />
      </div>
      <div className={styles.details}>
        <h3>Would you rather</h3>
        <p className={styles.option}>
          ...{optionOne.text}...
          </p>
        <Link to={`/questions/${id}`} className={styles.viewPoll}>
          <div>
            View Poll
            </div>
        </Link>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  const question = state.questions.byId[ownProps.id];
  const author = state.users.byId[question.author];
  return {
    ...question,
    author,
  };
}

export default connect(mapStateToProps)(QuestionPreview);

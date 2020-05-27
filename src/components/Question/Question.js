import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Question.module.css';
import Avatar from '../_common/Avatar/Avatar';
import { Poll } from '../Poll';
import { Result } from '../Result';
import { bindActionCreators } from 'redux';
import { actions } from '../../redux/questions.redux';

const Question = (props) => {
  const { isExistingQuestion, author, ownAnswer, hasAnswered, options, actions: { answerQuestion } } = props;
  if (!isExistingQuestion) {
    return <Redirect to='/pageNotFound' />
  }
  return (<div className={styles.question}>
    <div>
      <h4 className={styles.title}>{author.name} asks:</h4>
    </div>
    <div className={styles.content}>
      <div className={styles.avatar}>
        <Avatar avatarUrl={author.avatarURL} width={160} height={160} />
      </div>
      {!hasAnswered && <Poll options={options} handleSubmit={answerQuestion} />}
      {hasAnswered && <Result options={options} answer={ownAnswer} />}

    </div>
  </div>)
};


const mapStateToProps = (state, ownProps) => {
  const question = state.questions.byId[ownProps.match.params.id];
  if (!question) {
    return {
      isExistingQuestion: false,
    }
  }
  const author = state.users.byId[question.author];
  const ownAnswer = state.users.byId[state.auth.authedUser].answers[ownProps.match.params.id];
  const hasAnswered = ownAnswer !== undefined;
  const options = Object.keys(question)
    .filter(key => question[key].text && Array.isArray(question[key].votes))
    .map(key => ({
      id: key,
      label: question[key].text,
      votes: question[key].votes.length
    }));

  return {
    author,
    hasAnswered,
    ownAnswer,
    options,
    isExistingQuestion: true
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: bindActionCreators({
    answerQuestion: (answer) => actions.answerQuestion(ownProps.match.params.id, answer)
  }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Question));

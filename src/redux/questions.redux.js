import { _getQuestions, _saveQuestionAnswer, _saveQuestion } from "../api/_DATA";
import { showLoading, hideLoading } from 'react-redux-loading';

export const actionTypes = {
  GET_QUESTIONS: 'GET_QUESTIONS',
  ANSWER_QUESTION: 'ANSWER_QUESTION',
  ASK_QUESTION: 'ASK_QUESTION',
};

const actionCreators = {
  getQuestions: (questions) => ({
    type: actionTypes.GET_QUESTIONS,
    questions,
  }),
  answerQuestion: (questionId, user, answer) => ({
    type: actionTypes.ANSWER_QUESTION,
    questionId,
    user,
    answer,
  }),
  askQuestion: (question) => ({
    type: actionTypes.ASK_QUESTION,
    question,
  }),
};

export const actions = {
  getQuestions: () => (dispatch) => new Promise((res) => {
    dispatch(showLoading());
    _getQuestions().then(result => {
      dispatch(actionCreators.getQuestions(result));
      dispatch(hideLoading());
      res();
    })
  }),
  answerQuestion: (questionId, answer) => (dispatch, getState) => {
    const { auth: { authedUser } } = getState();
    dispatch(showLoading());
    _saveQuestionAnswer({
      authedUser,
      qid: questionId,
      answer,
    }).then(() => {
      dispatch(actionCreators.answerQuestion(questionId, authedUser, answer));
      dispatch(hideLoading());

    });
  },
  askQuestion: ({ optionOne, optionTwo }) => (dispatch, getState) => new Promise((res, rej) => {
    dispatch(showLoading());
    _saveQuestion({
      author: getState().auth.authedUser,
      optionOneText: optionOne,
      optionTwoText: optionTwo,
    }).then(result => {
      dispatch(actionCreators.askQuestion(result));
      dispatch(hideLoading());
      res();
    }).catch(e => rej(e));
  })
};

const reducer = (state = { byId: {}, allIds: [] }, action) => {
  switch (action.type) {
    case (actionTypes.GET_QUESTIONS):
      return {
        ...state,
        byId: { ...action.questions },
        allIds: Object.keys(action.questions),
      };
    case (actionTypes.ANSWER_QUESTION):
      const question = state.byId[action.questionId];
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.questionId]: {
            ...question,
            [action.answer]: {
              ...question[action.answer],
              votes: question[action.answer].votes.concat([action.user])
            }
          }
        }
      };
    case (actionTypes.ASK_QUESTION):
      return {
        allIds: [...state.allIds, action.question.id],
        byId: {
          ...state.byId,
          [action.question.id]: action.question,
        }
      };
    default:
      return state;
  }
};

export default reducer;

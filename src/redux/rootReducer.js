import { combineReducers } from 'redux';
import usersReducer from './users.redux';
import authReducer from './auth.redux';
import questionsReducer from './questions.redux';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
  users: usersReducer,
  auth: authReducer,
  questions: questionsReducer,
  loadingBar: loadingBarReducer,
});

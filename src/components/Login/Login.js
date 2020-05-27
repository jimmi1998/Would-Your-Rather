import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../redux/auth.redux';
import styles from './Login.module.css';

class Login extends React.Component {
  state = {
    value: '',
    error: null,
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  handleSubmit = () => {
    const { value } = this.state;
    const { actions, onSuccess, history } = this.props;
    if (value) {
      actions.signIn(value)
        .then(onSuccess)
        .then(() => history.push(history.location.state.from))
        .catch(e => this.setState({
          error: e
        }));
    }
  }

  render() {
    const { value, error } = this.state;
    const { users } = this.props;
    return (
      <div className={styles.login}>
        <div className={styles.title}>
          <h4>Welcome to the Would You Rather App!</h4>
          <p>Please sign in to continue</p>
        </div>
        <br></br>
        <div className={styles.logo}>
          <img src={require(`../../assets/images/logo.png`)} width={450} height={299} alt="React Redux logo" />
        </div>
        <div className={styles.selectUser}>
          <h3 >Sign in</h3>
          <select value={value} onChange={this.handleChange}>
            <option value="" disabled>Select user</option>
            {users.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
          </select>
          <div className={`${styles.submit} ${value === '' ? styles.disabled : null}`} onClick={this.handleSubmit}>
            Sign in
          </div>
          <div>
            {error !== null && <p>Something went wrong. Please try again</p>}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ users }) => ({
  users: users.allIds.map(id => users.byId[id]),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

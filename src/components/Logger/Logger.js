import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../redux/auth.redux';
import { withRouter } from 'react-router-dom';
import { Avatar } from '../_common/Avatar';
import styles from './Logger.module.css';

class Logger extends React.Component {
  signOut = () => {
    const { actions, history } = this.props;
    actions.signOut();
    history.push('./');
  }

  render() {
    const { authedUser } = this.props;
    if (authedUser) {
      return (<div className={styles.content}>
        <p className={styles.greeting}>Hello, {authedUser.name}</p>
        <div className={styles.avatar}>
          <Avatar avatarUrl={authedUser.avatarURL} width={33} height={33} />
        </div>
        <div className={styles.logout} onClick={this.signOut}><span>Sign out</span></div>
      </div>)
    }
    return null;
  }
};

const mapStateToProps = ({ auth, users: { byId } }) => ({
  authedUser: auth.authedUser ? byId[auth.authedUser] : null,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logger));

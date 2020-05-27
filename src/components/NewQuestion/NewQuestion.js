import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../redux/questions.redux';
import styles from './NewQuestion.module.css';

class NewQuestion extends React.Component {
  state = {
    optionOne: '',
    optionTwo: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = () => {
    this.props.actions.askQuestion(this.state)
      .then(() => this.props.history.push('/'));
  }

  render() {
    const { optionOne, optionTwo } = this.state;
    const hasValue = optionOne && optionTwo;
    return (
      <div className={styles.newQuestion}>
        <div className={styles.title}>
          <h2>Create New Question</h2>
        </div>
        <div className={styles.content}>
          <h5>Complete the question:</h5>
          <div className={styles.questions}>
            <h3>Would you rather...</h3>
            <div>
              <input
                type="text"
                value={optionOne}
                name="optionOne"
                onChange={this.handleChange}
                placeholder="Enter Option One Text Here"
              />
            </div>
            <p><span>OR</span></p>
            <div>
              <input
                type="text"
                value={optionTwo}
                name="optionTwo"
                onChange={this.handleChange}
                placeholder="Enter Option Two Text Here"
              />
            </div>
          </div>
          <div
            onClick={this.handleSubmit}
            className={`${styles.submit} ${hasValue ? null : styles.disabled}`}
          >
            Submit
          </div>
        </div>
      </div >
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    askQuestion: actions.askQuestion
  }, dispatch)
});

export default withRouter(connect(null, mapDispatchToProps)(NewQuestion));

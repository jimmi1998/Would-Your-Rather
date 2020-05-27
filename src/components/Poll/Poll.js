import React from 'react';
import styles from './Poll.module.css';

class Poll extends React.Component {
  state = {
    value: '',
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
  }

  onSubmit = () => {
    const { value } = this.state;
    if (value) {
      this.props.handleSubmit(value);
    }
  }

  render() {
    const { value } = this.state;
    const { options } = this.props;
    return (<div className={styles.content}>
      <div className={styles.title}>
        <h2>Would You Rather ...</h2>
      </div>
      <div className={styles.options}>
        {options.map(({ id, label }) => (
          <div key={id} className={styles.option}>
            <input type="radio" id={id} name="poll" value={id}
              checked={value === id} onChange={this.onChange} />
            <label htmlFor={id}>{label}</label>
          </div>
        ))}
      </div>
      <div
        onClick={this.onSubmit}
        className={`${styles.submit} ${value === '' ? styles.disabled : null}`}
      >
        Submit
      </div>
    </div>)
  }
}

export default Poll;

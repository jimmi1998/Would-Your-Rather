import React from 'react';
import styles from './Tabs.module.css';
import { withRouter } from 'react-router-dom';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: props.location.state ? props.location.state.hash : 0
    }
  }
  state = {
    activeTabIndex: 0,
  };

  setActive = (index) => {
    this.setState({
      activeTabIndex: index
    }, () => this.props.history.replace(
      this.props.history.location.pathname,
      {
        hash: index,
      }
    ));
  }

  render() {
    const { activeTabIndex } = this.state;
    const { tabs } = this.props;
    const { content: Component } = tabs[activeTabIndex];
    return (
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {tabs.map((tab, index) => (
            <div key={tab.label} className={`${styles.tab} ${activeTabIndex === index ? styles.active : null}`} onClick={() => this.setActive(index)}>{tab.label}</div>
          ))}
        </div>
        <div className={styles.tabContent}>
          {Component()}
        </div>
      </div>
    )
  }
}

export default withRouter(Tabs);

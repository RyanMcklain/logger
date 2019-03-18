import React, { Component } from 'react';
import './App.css';
import Logs from './components/logs';
import connectToFirebase from './hoc/firebase';

class App extends Component {
  render() {
    return (
      <Logs
        getUserLogs={ this.props.getUserLogs }
        setUserLogs={ this.props.setUserLogs } />
    );
  }
}

export default connectToFirebase(App);

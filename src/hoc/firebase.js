import React from 'react';
import { database, onUserAuth } from '../utils/firebase';

const connectToFirebase = (ComponsedComponent, onReady) => {
  class ComponentWithFirebaseLogs extends React.Component {
    constructor() {
      super();

      this.state = {
        logs: [],
        username: '',
        userId: null
      };
    }

    componentDidMount() {
      onUserAuth(user => {
        if (user) {
          this.setState({
            username: user.email,
            userId: user.uid
          });
        }
      });
    }

    getUserLogs() {
      return database.ref('/logs/' + this.state.userId).once('value').then(snapshot => {
        const logs = snapshot.val() || [];
        this.setState({ logs });
      });
    }

    async setUserLogs(logs) {
      const foo = await database.ref('/logs/' + this.state.userId).push(logs);
      debugger;
    }

    render() {
      if (!this.state.userId) {
        return null;
      }

      return (
        <ComponsedComponent
          setUserLog={ this.setUserLog }
          getUserLogs={ this.getUserLogs } />
      );
    }
  }

  return ComponentWithFirebaseLogs;
};

export default connectToFirebase;

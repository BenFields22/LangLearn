import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );

    var test = localStorage.getItem('user');
    //console.log(test)
    ReactDOM.render(<h2>Welcome {test}</h2>, document.getElementById('Welcome'));

  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <h1>Home</h1>
        <div id="Welcome"></div>
        <p>The Home Page is accessible by every signed in user.</p>
        { !!users && <UserList users={users} /> }
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
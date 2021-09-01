/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Login } from './LoginComponent';
import CreateAUser from './CreateAUser';
import './NavBar.css';
import './BeforeLogin.css';

export class BeforeLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: 'active',
      createAUser: 'inactive',
    };
  }

  openLogin = () => {
    this.setState({
      login: 'active',
      createAUser: 'inactive',
    });
  }

  openCreateAUser = () => {
    this.setState({
      login: 'inactive',
      createAUser: 'active',
    });
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.login === 'active') {
      return (
        <div>
          <Login openCreateAUser={this.openCreateAUser} />
        </div>
      );
    }
    return (
      <div>
        <CreateAUser />
      </div>

    );
  }
}

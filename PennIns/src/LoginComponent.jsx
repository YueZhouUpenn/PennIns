/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import React from 'react';
import { AfterLogin } from './AfterLogin';

export const ReturnMessage = {
  SUCCESS : "success",
  WRONG_PASSWORD : "wrong_password",
  NO_SUCH_USER : "user_not_found",
  ERROR : "server_error",
  ALREADY_USED_USER_NAME: "already_used",
}

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      userId: '5debe20ff432d32df02e5f92',
    };
  }


  logoutHandler = () => {
    this.setState({
      loggedin: false,
      userId: '5debe20ff432d32df02e5f92'
    });
  }

  submit(e) {
    const form = e.target;
    const formData = new FormData(form);
    const params = new URLSearchParams(formData);

    // Send request to the server
    fetch('http://localhost:8081/login', {
      method: 'POST',
      body: params,
    }).then((res) => res.json()).then((res) => {
      console.log(res);
      if(res.message === ReturnMessage.WRONG_PASSWORD) {
        console.log("password wrong");
        alert("Wrong password!");
      } else if(res.message === ReturnMessage.NO_SUCH_USER) {
        alert("No user named "+ res.no_such_name +"!");
      } else if(res.message === ReturnMessage.SUCCESS) {
        this.setState({
          userId: res.userId,
          loggedin: true
        });
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  render() {
    if (this.state.loggedin) {
      return (
        <div>
          <AfterLogin user_id={this.state.userId} logoutHandler={this.logoutHandler} />
        </div>
      );
    }
    return (
      <section className="container">
        <div className="span-6">
          <div className="login">
            <h1>PennIns</h1>
            <div className="login-content">
              <form onSubmit={this.submit.bind(this)} target="iframe">
                <label id="emailLabel">Please enter a valid email</label>
                <input name="username" placeholder="username" required></input>
                <label id="passwordLabel">Please enter your password</label>
                <input type="password" name="password" placeholder="Password" required></input><br></br><br></br>
                <button className="containerButton" onClick={this.props.openCreateAUser}> Create an Account</button>
                <input type="submit" value="Log in"></input>
              </form>
              <iframe id="iframe" name="iframe" style= {{display : 'none'}}></iframe>
            </div>
          </div>
        </div>
        <div className="span-6">
          <div className="message">
            <span className="first">Share your photos!</span>
          </div>
        </div>
      </section>
    );
  }
}

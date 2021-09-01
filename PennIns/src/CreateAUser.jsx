/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { AfterLogin } from './AfterLogin';
import {ReturnMessage} from './LoginComponent';

const validate = require('validate.js');
const passwordValidator = require('password-validator');

// eslint-disable-next-line new-cap
const validPwd = new passwordValidator();
// eslint-disable-next-line no-unused-vars
const reg = new RegExp();
validPwd
  .is().min(8) // Minimum length 8
  .is().max(16) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have digits
  .has()
  .not()
  .spaces()
  // eslint-disable-next-line no-useless-escape
  .has(['(?=.[!@#\$%\^&])']);


  async function postData(data) {
    console.log('fetch start');
    const response = await fetch('http://localhost:8081/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

export class CreateAUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', image: '', password: '', titleValidator: '', loggedin: false, userId: ""
    };
  }

  submitHandler() {
    /* input validation */
    if (validate.isEmpty(this.state.username)) {
      alert('Username is required.\nPlease enter a username.');
    } else if (document.getElementById('photoupload').files.length <= 0) {
      alert('Photo is required.\nPlease upload a photo.');
    } else if (document.getElementById('photoupload').files[0].size > 1048576 * 20) {
      alert('The size of the image you upload is over 20MB.\nPlease upload a smaller photo.');
    } else {
      alert(`You are creating ${this.state.username}`);

      // password validation
      // alert(validPwd.validate(this.state.password, { list: true }));


      const uploadFile = document.getElementById('photoupload').files[0];
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      const usernameInput = this.state.username;
      const passwordInput = this.state.password;
      console.log(usernameInput);
      console.log(passwordInput);
      // console.log();
      // eslint-disable-next-line no-unused-vars
      reader.onload = async(e) => {
        const data = {
          username: usernameInput,
          password: passwordInput,
          image: this.result,
        };
        // console.log("image:"+data.image);
        // eslint-disable-next-line no-unused-vars
        // https://stackoverflow.com/questions/48474970/saving-fetched-json-into-variable/48475017
        const resJson = await postData(data);

        if(resJson.message === ReturnMessage.ALREADY_USED_USER_NAME) {
          alert('Create account fail!');
          alert('Username ' + resJson.alreadyUsedName + ' has been used');
        } else if(resJson.message === ReturnMessage.SUCCESS) {
          alert('Create account success!');
          this.setState({
            loggedin : true,
            userId: resJson.userId,
          });
        }
      };
    }
  }

  changeHandler = (event) => {
    const nam = event.target.name;
    const val = event.target.value;

    /* input validation */
    if (nam === 'username' && validate.isEmpty(val)) {
      this.setState({ validator: 'Username is required.' });
    } else if (nam === 'username' && !validate.isEmpty(val)) {
      this.setState({ validator: '' });
    }
    this.setState({ [nam]: val });
  }

  /*
    photoHandler = (event) => {
        alert('You are creating ' + this.state.username);
        let uploadFile = document.getElementById('photoupload').files[0];
        let reader = new FileReader();
        reader.readAsDataURL(uploadFile);
        const username = this.state.username;
        const password = this.state.password
        reader.onload = function (e) {
            let data = {
                username: username,
                password: password,
                image: 'nonono'
            };
            console.log(data.image);
            postData(data).then(res => {
                alert('Create account success!');
            }).catch(error => {
                alert(error);
            });
        }
    }
*/
  render() {
    if (this.state.loggedin) {
      return <AfterLogin user_id={this.state.userId} />
    } 
    return (
      <section className="container">
      <div className="span-6">
        <div className="login">
          <h1>New User</h1>
          <div className="login-content">
            <form onSubmit={this.submitHandler.bind(this)} target="iframe" >
              <label id="emailLabel">Please enter a valid email</label>
              <input name="username"  placeholder="username" onChange={this.changeHandler} required></input>
              <label id="passwordLabel">Please enter your password</label>
              <input type="file" id="photoupload" name="image" accept="image/*" />
              <label id="passwordLabel">Please enter your password</label>
              <input type="password" name="password" placeholder="Password" onChange={this.changeHandler} required></input><br></br><br></br>
              <input type="submit" value="Submit"></input>
            </form>
            <iframe id="iframe" name="iframe" style= {{display : 'none'}}></iframe>
          </div>
        </div>
      </div>
      <div className="span-6">
        <div className="message">
          <span className="first">Welcome to PennIns!</span>
      </div>
      </div>
      </section>
    );
  }
}

export default CreateAUser;

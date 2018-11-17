import React from 'react';
import ReactDOM from 'react-dom';
import Redirect from "react-router-dom";
import { login, register, logout, loggedIn, getToken } from './utils.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.setTokenState = this.props.setTokenState;
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogin(e) {
    e.preventDefault();
    let { username, password } = this.state;
    login(username, password)
    .then((res) => this.setTokenState())
    .then((res) => this.props.history.replace('/'))
    .catch((err) => { console.log(err) })
  }

  handleRegister(e) {
    e.preventDefault();
    console.log('Registering new user!')
    let { username, password } = this.state;
    register(username, password)
    .then((res) => this.setTokenState())
    .then((res) => this.props.history.replace('/'))
    .catch((err) => { console.log(err) })
  }

  render() {
    return (
      <div className="container d-flex">
        <div className="card login-form d-flex" style={{width: "18rem"}}>
          <form>
            <span>Username</span>
            <input className="login-form__field" type="text" name="username" onChange={this.handleChange} />
            <span>Password</span>
            <input className="login-form__field" type="password" name="password" onChange={this.handleChange} />
            <div className="login-form__buttons d-flex">
              <button type="submit" name="action" value="login" onClick={this.handleLogin}>Login</button>
              <button type="submit" name="action" value="register" onClick={this.handleRegister}>Register</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;

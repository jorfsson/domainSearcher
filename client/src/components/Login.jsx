import React from 'react';
import ReactDOM from 'react-dom';
import Redirect from "react-router-dom";
import { submit } from './utils.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setTokenState = this.props.setTokenState;
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let { username, password } = this.state, method = e.target.value;
    submit(method, username, password)
    .then((res) => {
      console.log(res.message);
      this.setTokenState();
      this.props.history.replace('/');
    })
    .catch((err) => { console.log(err) })
  }

  render() {
    return (
      <div className="container login d-flex">
        <div className="card login-form d-flex" style={{width: "18rem"}}>
          <form>
            <span>Username</span>
            <input className="login-form__field" type="text" name="username" onChange={this.handleChange} />
            <span>Password</span>
            <input className="login-form__field" type="password" name="password" onChange={this.handleChange} />
            <div className="login-form__buttons d-flex">
              <button type="submit" name="action" value="login" onClick={this.handleSubmit}>Login</button>
              <button type="submit" name="action" value="register" onClick={this.handleSubmit}>Register</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;

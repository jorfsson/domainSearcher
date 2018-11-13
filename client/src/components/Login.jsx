import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './Auth.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    Auth.login(username, password)
    .then((res) => res.json())
    .catch((err) => { console.log(error) })
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          Username
          <input type="text" name="username" onChange={this.onChange} />
          Password
          <input type="password" name="password" onChange={this.onChange} />
        </form>
      </div>
    )
  }
}

export default Login;

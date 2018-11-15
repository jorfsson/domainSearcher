import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect } from "react-router-dom";
import { loggedIn, logout, getToken } from './utils.jsx';
import Login from './Login.jsx';
import Search from './Search.jsx';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      token: getToken(),
      user: ''
    }
    this.setTokenState = this.setTokenState.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setTokenState(response) {
    this.setState({
      token: getToken(),
      user: response.username
    })
  }

  setUser(username) {
    this.setState({
      user: username
    })
  }

  render() {
    return (
      <React.Fragment>
        <Route exact path='/' render={(props) =>
          this.state.token ? (
            <Redirect to='/search' {...props} />
          ) : (
            <Redirect to='/login' {...props} />
          )}/>
        <Route path='/search' render={(props) =>
          this.state.token ? (
            <Search setTokenState={this.setTokenState} user={this.state.user} {...props}/>
          ) : (
            <Redirect to='/login' {...props} />
          )}/>
        <Route path='/login' render={(props) =>
          !this.state.token ? (
            <Login setTokenState={this.setTokenState} setUser={this.setUser} {...props}/>
          ) : (
            <Redirect to='/search' {...props} />
          )}/>
      </React.Fragment>
    )
  }
}

export default App;

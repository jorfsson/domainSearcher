import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import { loggedIn, logout, getToken } from './utils.jsx';
import Login from './Login.jsx';
import Search from './Search.jsx';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      token: null
    }
    this.setTokenState = this.setTokenState.bind(this);
  }

  setTokenState(token) {
    this.setState({
      token: getToken()
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={(props) =>
          this.state.token !== null ? (
            <Redirect to='/search' {...props} />
          ) : (
            <Redirect to='/login' {...props} />
          )}/>
        <Route path='/search' render={(props) => <Search setTokenState={this.setTokenState} {...props}/>}/>
        <Route path='/login' render={(props) => <Login setTokenState={this.setTokenState} {...props}/>}/>
      </div>
    )
  }
}

export default App;

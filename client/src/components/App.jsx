import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from './utils.jsx';
import Login from './Login.jsx';
import Search from './Search.jsx';
import decode from 'jwt-decode';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      token: isLoggedIn()
    }
    this.setTokenState = this.setTokenState.bind(this);
  }

  setTokenState() {
    this.setState({
      token: isloggedIn(),
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
            <Search setTokenState={this.setTokenState}  {...props}/>
          ) : (
            <Redirect to='/login' {...props} />
          )}/>
        <Route path='/login' render={(props) =>
          !this.state.token ? (
            <Login setTokenState={this.setTokenState} {...props}/>
          ) : (
            <Redirect to='/search' {...props} />
          )}/>
      </React.Fragment>
    )
  }
}

export default App;

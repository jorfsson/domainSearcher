import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import * as Auth from './Auth.jsx';
import Login from './Login.jsx';
import Search from './Search.jsx';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: Auth.login()
    }
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          this.state.loggedIn ? (
            <Redirect to='/search' />
          ) : (
            <Redirect to='/login' />
          ))}/>
        <Route path="/search" component={Search}/>
        <Route path="/login" component={Login}/>
      </div>
    )
  }
}

export default App;

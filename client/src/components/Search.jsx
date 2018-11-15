import React from 'react';
import Results from './Results.jsx';
import decode from 'jwt-decode';
import { authFetch, logout, getToken, loggedIn } from './utils.jsx';

class Search extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      results: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('Submitting!');
    authFetch('http://localhost:3000/search', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({data: this.state.search}),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((data) => { console.log(data); })
  }

  handleChange(e) {
    this.setState({
      search: e.target.value
    })
  }

  handleLogout() {
    logout();
    this.props.setTokenState({username: ""})
    return this.props.history.replace('/');
  }

  render() {
    return (
      <div className="container">
        <button type="submit" onClick={this.handleLogout}>Logout</button>
        User logged in as {this.props.user}
        <div className="search d-flex">
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="search" onChange={this.handleChange} />
            <button type="submit">Submit</button>
          </form>
          <Results results={this.state.results} />
        </div>
      </div>
    )
  }
}

export default Search;

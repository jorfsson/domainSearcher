import React from 'react';
import Results from './Results.jsx';
import decode from 'jwt-decode';
import { authFetch, logout, getToken, loggedIn, search } from './utils.jsx';

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
    search(this.state.search)
    .then((res) => this.setState({ results: res }))
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
        <div className="search__user-bar d-flex">
          <span className="search__user-bar__username">Logged in as <strong>{this.props.username}</strong></span>
          <button type="submit" onClick={this.handleLogout}>Logout</button>
        </div>
        <div className="search d-flex">
          <div className="search__form">
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="search" onChange={this.handleChange} />
              <button type="submit">Submit</button>
            </form>
          </div>
          <Results results={this.state.results} />
        </div>
      </div>
    )
  }
}

export default Search;

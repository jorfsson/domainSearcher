import React from 'react';
import Results from './Results.jsx';
import decode from 'jwt-decode';
import { authFetch, logout, getToken, loggedIn, search, getUsername } from './utils.jsx';

class Search extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      results: [],
      user: ""
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }

  componentDidMount() {
    this.setUsername();
  }

  setUsername() {
    this.setState({
      user: getUsername()
    })
  }

  handleSearch(e){
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
          <span className="search__user-bar__username">Logged in as <strong>{this.state.user}</strong></span>
          <button type="submit" onClick={this.handleLogout}>Logout</button>
        </div>
        <div className="search d-flex">
          <div className="search__form">
            <form onSubmit={this.handleSearch}>
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

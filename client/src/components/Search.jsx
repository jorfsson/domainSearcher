import React from 'react';
import Result from './Result.jsx';
import decode from 'jwt-decode';
import { logout, search, getUsername } from './utils.jsx';

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
    this.setState({ search: e.target.value })
  }

  handleLogout() {
    logout();
    this.props.setTokenState({ username: "" })
    return this.props.history.replace('/');
  }

  render() {
    return (
      <div className="container search">
        <div className="search__user-bar d-flex">
          <span className="search__user-bar__username">Logged in as <strong>{this.state.user}</strong></span>
          <button type="submit" onClick={this.handleLogout}>Logout</button>
        </div>
        <div className="search d-flex">
          <form className="search__form d-flex" onSubmit={this.handleSearch}>
            <input className="search__form-input" type="text" name="search" placeholder='Limit 25 search terms. Separate by commons, i.e. "company1, company2, company3..."' onChange={this.handleChange} />
            <button className="search__form-button" type="submit">Submit</button>
          </form>
          <div className="search__results d-flex">
            {this.state.results.map((result) => <Result key={result.id} result={result} />)}
          </div>
        </div>
      </div>
    )
  }
}

export default Search;

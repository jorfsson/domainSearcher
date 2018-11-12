import React from 'react';
import ReactDOM from 'react-dom';
import Results from './Results.jsx';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      results: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    let searchTerms = this.state.search.split(',').map((result) => result.trim());
    searchTerms.forEach((search) => {
      fetch('http://localhost:3000/search', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({data: search}),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
    })
  }

  handleChange(e){
    this.setState({
      search: e.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="search" onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
        <Results results={this.state.results} />
      </div>
    )
  }
}

export default App;

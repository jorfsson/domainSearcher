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
    fetch('http://localhost:3000', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({data: this.state.search}),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((data) => this.setState({
      results: data
    })).then((data)=>{console.log(this.state.results)})
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
        <Results queryResults={this.state.results} />
      </div>
    )
  }
}

export default App;

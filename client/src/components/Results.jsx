import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      results: props.results
    }
  }

  render() {
    return (
      {results.map((result) => <div className='result'>result</div>)}
    )
  }

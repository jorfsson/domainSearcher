import React from 'react';
import ReactDOM from 'react-dom';

class Results extends React.Component{
  render() {
    return (
      <div className='queryResults'>
        {this.props.results.map((result) => <div className='result'>{result.link} is the link for {result.name}</div>)}
      </div>
    )
  }
}

export default Results;

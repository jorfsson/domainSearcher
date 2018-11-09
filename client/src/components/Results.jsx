import React from 'react';
import ReactDOM from 'react-dom';

class Results extends React.Component{
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     results: props.queryResults
  //   }
  // }

  render() {
    console.log('Results hey! ')
    return (
      <div className='queryResults'>
        {this.props.queryResults.map((result) => <div className='result'>{result.link} is the link for {result.name}</div>)}
      </div>
    )
  }
}

export default Results;

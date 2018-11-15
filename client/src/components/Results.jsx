import React from 'react';
import ReactDOM from 'react-dom';

class Results extends React.Component {
  render() {
    let results = this.props.results.map((result) => ({search: result.search_term, results: result.results}));
    console.log(results)
    return (
      <div className='queryResults'>
        {results.map((result) =>
          <div>{result.search}:
          {result.results.map((res) => <div>{res.url}</div>)}

          </div>
        )}
      </div>
    )
  }
}

export default Results;

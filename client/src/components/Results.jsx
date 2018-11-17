import React from 'react';
import ReactDOM from 'react-dom';
import { convert } from './utils.jsx';
class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previous: {},
      current: {}
    }
    this.handleConversions = this.handleConversions.bind(this);
  }

  async handleConversions(search_id, domain_id) {
    await this.setState({ previous: this.state.current, current: { search_id, domain_id }});
    convert(this.state.current, this.state.previous)
  }

  render() {
    let searches = this.props.results;
    console.log(searches);
    return (
      <div className='queryResults'>
        {searches.map((search) =>
          <div>{search.results.map((domain) => <div className="domain" href={domain.url} onClick={() => { this.handleConversions(search.id, domain.id)}}>{domain.url}</div>)}
          </div>
        )}
      </div>
    )
  }
}

export default Results;

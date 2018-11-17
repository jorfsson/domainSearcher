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
    convert(this.state.current, this.state.previous).then((res) => { console.log(res) });
  }

  render() {
    let searches = this.props.results;
    return (
      <div className='queryResults'>
        {searches.map((search) =>
          <div>{search.search_term}:
          {search.results.map((domain) => <div className="domain" onClick={() => { this.handleConversions(search.id, domain.id)}}>{domain.url}</div>)}
          </div>
        )}
      </div>
    )
  }
}

export default Results;

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
    this.search = this.props.result.search_term;
    this.mainDomain = this.props.result.results[0];
    this.domains = this.props.result.results.slice(1);
    this.handleConversions = this.handleConversions.bind(this);
  }

  async handleConversions(search, domain) {
    if (this.state.current.search_id !== search && this.state.current.domain_id !== domain) {
      await this.setState({ previous: this.state.current, current: { search_id: search, domain_id: domain }});
    }
    convert(this.state.current, this.state.previous)
  }

  render() {
    return (
      <div className='domains d-flex'>
        <h2>{this.search}: <a className="domain" href={this.mainDomain.url} target="_blank" key={this.mainDomain.id} onClick={() => { this.handleConversions(this.mainDomain._pivot_search_id, this.mainDomain._pivot_domain_id)}}>{this.mainDomain.url}</a></h2>
        Other Results:
        {this.domains.map((domain) => <a className="domain" href={domain.url} target="_blank" key={domain.id} onClick={() => { this.handleConversions(domain._pivot_search_id, domain._pivot_domain_id)}}>{domain.url}</a>)}
      </div>
    )
  }
}

export default Results;

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
    this.domains = this.props.result.results;
    this.handleConversions = this.handleConversions.bind(this);
  }

  async handleConversions(search_id, domain_id) {
    await this.setState({ previous: this.state.current, current: { search_id, domain_id }});
    convert(this.state.current, this.state.previous)
  }

  render() {
    let mainDomain = this.domains[0];
    console.log(mainDomain)
    this.domains = this.domains.slice(1);
    return (
      <div className='domains d-flex'>
        <h2>{this.search}: <a className="domain" href={mainDomain.url} target="_blank" key={mainDomain.id} onClick={() => { this.handleConversions(mainDomain._pivot_search_id, mainDomain._pivot_domain_id)}}>{mainDomain.url}</a></h2>
        Other Results:
        {this.domains.map((domain) => <a className="domain" href={domain.url} target="_blank" key={domain.id} onClick={() => { this.handleConversions(domain._pivot_search_id, domain._pivot_domain_id)}}>{domain.url}</a>)}
      </div>
    )
  }
}

export default Results;

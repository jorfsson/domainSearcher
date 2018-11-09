import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

class Index extends React.Component{
  render() {
    return (
      <div>Hello</div>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('App'));

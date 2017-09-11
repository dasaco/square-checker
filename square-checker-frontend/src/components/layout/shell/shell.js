import React, { Component } from 'react';
import './shell.scss';

class Shell extends Component {
  render() {
    return (
      <div className="shell">
        { this.props.children }
      </div>
    );
  }
}

export default Shell;

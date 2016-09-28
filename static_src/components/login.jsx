
import React from 'react';

export default class Login extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <a href="/handshake" className="test-login">
        Login</a>
      <div className="text-right">
        <h3>Version: <span>Alpha</span></h3>
        <a href="https://github.com/AusDTO/cf-deck" className="test-contribute_link">
          <span aria-hidden="true">
            Contribute</span>
        </a>
      </div>
    </div>
    );
  }
}

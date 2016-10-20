
import style from '../scss/main.scss';
import React from 'react';

import LoginStore from '../stores/login_store.js';

import createStyler from '../util/create_styler';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.styler = createStyler(style);
  }

  getImagePath(iconName) {
    const img = require('cloudgov-style/img/cloudgov-sprite.svg');
    return `/assets/${img}#${iconName}`;
  }

  render() {
    const loggedIn = LoginStore.isLoggedIn();
    let loginLink = (!loggedIn) ? <a href="/handshake">Login</a> : <a href="/v2/logout">Logout</a>;
    return (
    <header role="banner">
      <section className={ this.styler('govau--header') }>
        <div className={ this.styler('wrapper') }>
          <div className={ this.styler('govau--logo') }>
            <a href="/" className={ this.styler('logo') } title="Home">
              cloud.gov.au Dashboard
            </a>
          </div>
          <div className={ this.styler('feedback') }>
            { loginLink }
          </div>
        </div>
        {/*
        <div className={ this.styler('wrapper') }>
          <nav aria-label='global navigation' className={ this.styler('inline-links--inverted') }>
            <ul className={ this.styler('global-navigation') }>
              <li>
                <a href="https://cloud.gov/#about">About</a>
              </li>
              <li>
                <a href="https://docs.cloud.gov">Documentation</a>
              </li>
              <li>
                <a href="https://cloud.gov/updates/">Updates</a>
              </li>
              <li>
                <a href="https://cloudgov.statuspage.io/">
                  Status
                </a>
              </li>
              <li>
                <a href="https://cloud.gov/#contact">Contact</a>
              </li>
              <li>
                { loginLink }
              </li>
            </ul>
          </nav>
      </div>
      */}
      </section>
    </header>
    );
  }
}

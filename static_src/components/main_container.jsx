
import React from 'react';
import style from '../scss/main.scss';
import overrideStyle from '../css/overrides.css';

import createStyler from '../util/create_styler';


import Header from './header.jsx';
import Login from './login.jsx';
import LoginStore from '../stores/login_store.js';
import OrgStore from '../stores/org_store.js';
import SpaceStore from '../stores/space_store.js';
import { Nav } from './navbar.jsx';

function stateSetter() {
  return {
    currentOrgGuid: OrgStore.currentOrgGuid,
    currentSpaceGuid: SpaceStore.currentSpaceGuid,
    isLoggedIn: LoginStore.isLoggedIn()
  };
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.styler = createStyler(style, overrideStyle);
    this.state = stateSetter();;
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(stateSetter());
  }

  render() {
    let content;
    let sidebar;

    if (this.state.isLoggedIn) {
      content = this.props.children;
      sidebar = <Nav />;
    } else {
      content = <Login />;
    }


    return (
      <div>
        <Header />
        <main role="main">
          <aside id="nav" className={ this.styler('sidebar') }>
            <nav className={ this.styler('local-nav') } aria-label="main-navigation">
              <h1 className={ this.styler('is-visuallyhidden') }>Menu</h1>
              { sidebar }
            </nav>
          </aside>
          <article id="content" className={ this.styler('content-main') }>
            { content }
          </article>
        </main>
      </div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.any
};

App.defaultProps = {
  children: []
};

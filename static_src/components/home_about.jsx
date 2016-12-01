
import style from 'cloudgov-style/css/cloudgov-style.css';
import React from 'react';

import createStyler from '../util/create_styler';
import { config } from 'skin';

export default class HomeAbout extends React.Component {
  constructor(props) {
    super(props);
    this.styler = createStyler(style);
  }

  render() {
    return (
      <section className={ this.props.className }>
        <h4>About this Dashboard</h4>
        <p>This is an alpha version. You can check out
          the <a href={config.github.url}>source code</a> and
          <a href={`${config.github.url}/issues`}> issue tracker</a>.</p>
      </section>
    );
  }
}

HomeAbout.propTypes = {
  className: React.PropTypes.string.isRequired
};

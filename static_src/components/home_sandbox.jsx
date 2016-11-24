
import style from 'cloudgov-style/css/cloudgov-style.css';
import React from 'react';

import createStyler from '../util/create_styler';

export default class HomeSandbox extends React.Component {
  constructor(props) {
    super(props);
    this.styler = createStyler(style);
  }

  render() {
    return (
      <section className={ this.props.className }>
        <h4>Looking at an empty sandbox?</h4>
        <p><a href="https://docs.cloud.gov/getting-started/your-first-deploy/">Try making a “hello world” app</a>.</p>
      </section>
    );
  }
}

HomeSandbox.propTypes = {
  className: React.PropTypes.string.isRequired
};

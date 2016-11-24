
import style from 'cloudgov-style/css/cloudgov-style.css';
import React from 'react';

import createStyler from '../util/create_styler';

export default class HomeEnvironment extends React.Component {
  constructor(props) {
    super(props);
    this.styler = createStyler(style);
  }

  render() {
    return (
      <section className={ this.props.className }>
        <h4>Environments</h4>
        <p>If your org <a href="https://docs.cloud.gov/apps/govcloud/">is in GovCloud</a>, use <a href="https://dashboard.fr.cloud.gov/">https://dashboard.fr.cloud.gov/</a> to see it.</p>
      </section>
    );
  }
}

HomeEnvironment.propTypes = {
  className: React.PropTypes.string.isRequired
};

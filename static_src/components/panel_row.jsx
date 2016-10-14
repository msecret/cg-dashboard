
import React from 'react';

import style from '../scss/main.scss';

import createStyler from '../util/create_styler';

export default class PanelRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.styler = createStyler(style);
  }

  render() {
    return (
      <div className={ this.styler('panel-row') }>
        { this.props.children }
      </div>
    );
  }
}

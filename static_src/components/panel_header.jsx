
import style from 'gov-au-ui-kit/assets/sass/ui-kit.scss';
import React from 'react';

import createStyler from '../util/create_styler';

export default class PanelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.styler = createStyler(style);
  }

  render() {
    return (
      <header className={ this.styler('panel-header') }>
        { this.props.children }
      </header>
    );
  }
}


import React from 'react';

import style from 'gov-au-ui-kit/assets/sass/ui-kit.scss';

import createStyler from '../util/create_styler';

const propTypes = {
  children: React.PropTypes.any
};
const defaultProps = {
  children: []
};

export default class PanelActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.styler = createStyler(style);
  }

  render() {
    return (
      <span className={ this.styler('panel-actions') }>
        { this.props.children }
      </span>
    );
  }
}

PanelActions.propTypes = propTypes;
PanelActions.defaultProps = defaultProps;

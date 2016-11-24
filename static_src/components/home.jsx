
import style from 'cloudgov-style/css/cloudgov-style.css';
import React from 'react';

import Grid from './grid.jsx';

import createStyler from '../util/create_styler';
import { skinConfig } from 'skin/skin_config.js';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.styler = createStyler(style);
  }

  render() {
    return (
      <div>
        <div className={ this.styler('grid') }>
          <h1>Overview</h1>
          <p className={ this.styler('page-dek') }>The dashboard provides an overview of your organizations, spaces, and applications. For full management and deployment of applications, use the <a href={ skinConfig.docs.cli }>command line interface</a>.
          </p>
          <h3 style={ {marginBottom: '0.5rem' }}>Cheatsheet</h3>
          <Grid tiles={skinConfig.home.tiles} columns={2} />
        </div>
      </div>
    );
  }
}

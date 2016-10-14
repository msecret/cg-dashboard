
import style from 'gov-au-ui-kit/assets/sass/ui-kit.scss';
import React from 'react';

import PanelGroup from './panel_group.jsx';
import PanelHeader from './panel_header.jsx';
import PanelRow from './panel_row.jsx';

import createStyler from '../util/create_styler';

export default class UsageAndLimits extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.styler = createStyler(style);

    this.getStat = this.getStat.bind(this);
  }

  getStat(statName) {
    if (statName.indexOf('quota') > -1) {
      return (this.props.app.stats &&
              this.formatMb(this.props.app.stats[statName]) ||
              0);
    } else {
      return (this.props.app.stats &&
              this.formatMb(this.props.app.stats.usage[statName]) ||
              0);

    }
  }

  // TODO move to util
  formatMb(bytes) {
    if (!bytes) return '0';
    return Math.round(bytes / 1000000);
  }

  get disk() {
    let helpText = <span></span>;
    if (this.props.app.state.toUpperCase() === 'STOPPED') {
      helpText = <em> Stopped apps do not use disk space.</em>;
    }
    return (
      <div>
        <h5 className={ this.styler('panel-column', 'panel-column-less') }>
          Disk
        </h5>
        <span className={ this.styler('panel-column') }>
          { this.getStat('disk_quota') } MB
        </span>
        <span className={ this.styler('panel-column') }
            style={{ textAlign: 'left' }}>
          Using { this.getStat('disk') }  MB
          { helpText }
        </span>
      </div>
    );
  }

  get memory() {
    let helpText = <span></span>;
    if (this.props.app.state.toUpperCase() === 'STOPPED') {
      helpText = <em> Stopped apps do not use memory.</em>;
    }
    return (
      <div>
        <h5 className={ this.styler('panel-column', 'panel-column-less') }>
          Memory
        </h5>
        <span className={ this.styler('panel-column') }>
          { this.getStat('mem_quota') } MB
        </span>
        <span className={ this.styler('panel-column') }
            style={{ textAlign: 'left' }}>
          Using { this.getStat('mem') }  MB.
          { helpText }
        </span>
      </div>
    );
  }

  // TODO: remove this presentational span
  get appState() {
    return (
      <div>
        <h5 className={ this.styler('panel-column', 'panel-column-less') }>
          App state
        </h5>
        <span className={ this.styler('panel-column') }>
          RUNNING
        </span>
        <span className={ this.styler('panel-column') }></span>
      </div>
    );
  }

  render() {
    let content = <div></div>;

    if (this.props.app) {
      content = (
        <PanelGroup>
          <PanelHeader>
            <h3>Usage and Limits</h3>
          </PanelHeader>
          <PanelRow>
            { this.appState }
          </PanelRow>
          <PanelRow>
            { this.memory }
          </PanelRow>
          <PanelRow>
            { this.disk }
          </PanelRow>
          <PanelRow>
            <div>
              <p style={{ width: '100%' }}>To start or stop an app, follow the <a
                href="https://docs.cloudfoundry.org/devguide/deploy-apps/deploy-app.html"
                target="_blank">Cloud Foundry deployment guide.</a>
              </p>
            </div>
          </PanelRow>
        </PanelGroup>
      );
    }

    return content;
  }
}

UsageAndLimits.propTypes = {
  app: React.PropTypes.object
};

UsageAndLimits.defaultProps = {
  app: {}
};

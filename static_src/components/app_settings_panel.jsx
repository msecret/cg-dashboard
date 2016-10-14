
import React from 'react';

import style from '../scss/main.scss';

import Panel from './panel.jsx';
import RouteList from './route_list.jsx';

import AppStore from '../stores/app_store.js';
import OrgStore from '../stores/org_store.js';
import QuotaStore from '../stores/quota_store.js';
import SpaceStore from '../stores/space_store.js';
import UsageAndLimits from './usage_and_limits.jsx';

import createStyler from '../util/create_styler';

const propTypes = {
  title: React.PropTypes.string,
  app: React.PropTypes.object
};

const defaultProps = {
  title: 'Default title',
  app: {}
};

function stateSetter() {
  const currentOrg = OrgStore.get(OrgStore.currentOrgGuid);
  const currentSpace = SpaceStore.get(SpaceStore.currentSpaceGuid);
  const orgQuotaGuid = (currentOrg) ? currentOrg.quota_definition_guid : null;
  const spaceQuotaGuid = (currentSpace) ? currentSpace.space_quota_definition_guid : null;
  const currentAppGuid = AppStore.currentAppGuid;

  return {
    orgQuota: QuotaStore.get(orgQuotaGuid),
    spaceQuota: QuotaStore.get(spaceQuotaGuid),
    currentAppGuid
  };
}

export default class AppSettingsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = stateSetter();
    this.styler = createStyler(style);

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    OrgStore.addChangeListener(this._onChange);
    QuotaStore.addChangeListener(this._onChange);
    SpaceStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    OrgStore.removeChangeListener(this._onChange);
    QuotaStore.removeChangeListener(this._onChange);
    SpaceStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(stateSetter());
  }

  render() {
    let routeLimit;
    if (this.state.spaceQuota) {
      routeLimit = this.state.spaceQuota.total_routes;
    } else if (this.state.orgQuota) {
      routeLimit = this.state.orgQuota.total_routes;
    }

    return (
      <Panel title="Application settings">
        <UsageAndLimits app={ this.props.app }/>
        <RouteList initialAppGuid={ this.state.currentAppGuid } routeLimit={ routeLimit } />
      </Panel>
    );
  }
}

AppSettingsPanel.propTypes = propTypes;
AppSettingsPanel.defaultProps = defaultProps;

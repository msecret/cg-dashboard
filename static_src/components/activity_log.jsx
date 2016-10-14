
import style from 'gov-au-ui-kit/assets/sass/ui-kit.scss';
import React from 'react';

import ActivityLogItem from './activity_log_item.jsx';
import ActivityStore from '../stores/activity_store';
import createStyler from '../util/create_styler';

function stateSetter(props) {
  const activity = ActivityStore.getAll().filter((item) => {
    if (item.activity_type === 'event') {
      if (item.type === 'audit.service_binding.create') {
        return item.metadata.request.app_guid === props.initialAppGuid;
      }
      return item.actee === props.initialAppGuid;
    } else if (item.activity_type === 'log') {
      return item.app_guid === props.initialAppGuid && item.status_code >= 400;
    }
  }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return {
    activity,
    empty: (ActivityStore.fetched && activity.length === 0)
  };
}

const propTypes = {
  initialAppGuid: React.PropTypes.string.isRequired,
  title: React.PropTypes.string
};

const defaultProps = {
  title: 'Activity Log'
};

export default class ActivityLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = stateSetter(props);
    this.styler = createStyler(style);

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    ActivityStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ActivityStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(stateSetter(this.props));
  }

  render() {
    let content = <div></div>;

    if (this.state.empty) {
      content = <h5 className="test-none_message">No recent activity</h5>;
    } else {
      content = (
        <ul className={ this.styler('activity_log') }>
          { this.state.activity.map((item) => {
            return (
              <ActivityLogItem key={ item.guid } item={ item } />
            );
          })}
        </ul>
      );
    }

    return (
      <div className={ this.styler('activity_log-container') }>
        <h1>{ this.props.title }</h1>
        { content }
      </div>
    );
  }
}

ActivityLog.propTypes = propTypes;
ActivityLog.defaultProps = defaultProps;

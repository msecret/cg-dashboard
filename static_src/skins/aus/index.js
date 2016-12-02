import Immutable from 'immutable';
import { config as baseConfig } from '../cg';

let newConfig = baseConfig.mergeDeep({
  header: {
    // TODO: figure out what this should say
    disclaimer: 'This is a disclaimer',
    show_flag: false
  },
  docs: {
    cli: 'http://docs.cloud.gov.au/getting_started/install_cli/'
  },
  github: {
    url: 'https://github.com/AusDTO/cg-dashboard'
  }
});

// can't deep merge the links because we want to replace the entire list
newConfig = newConfig.setIn(['header', 'links'], Immutable.fromJS(
  [
    {
      text: 'About',
      url: 'http://cloud.gov.au'
    },
    {
      text: 'Documentation',
      url: 'http://docs.cloud.gov.au'
    },
    {
      text: 'Status',
      url: 'https://status.cloud.gov.au'
    },
    {
      text: 'Help',
      url: 'http://docs.cloud.gov.au/support/help/'
    }
  ]
));

export const config = newConfig;

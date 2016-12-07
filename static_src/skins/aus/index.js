
import merge from 'deepmerge';

import { config as baseConfig } from '../cg';

const newConfig = merge({
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
}, baseConfig);

// can't deep merge the links because we want to replace the entire list
newConfig.header.links = [
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
;

export const config = newConfig;

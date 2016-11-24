import HomeAbout from '../../components/home_about.jsx';
import HomeIntro from '../../components/home_intro.jsx';

export const skinConfig = {
  header: {
    // TODO: figure out what this should say
    disclaimer: 'This is a disclaimer',
    show_flag: false,
    links: [
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
  },
  docs: {
    cli: 'http://docs.cloud.gov.au/getting_started/install_cli/'
  },
  github: {
    url: 'https://github.com/AusDTO/cg-dashboard'
  },
  home: {
    tiles: [HomeIntro, HomeAbout]
  }
};

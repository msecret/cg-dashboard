import HomeAbout from '../../components/home_about.jsx';
import HomeCGStructure from '../../components/home_cg_structure.jsx';
import HomeEnvironments from '../../components/home_environments.jsx';
import HomeSandbox from '../../components/home_sandbox.jsx';
import HomeIntro from '../../components/home_intro.jsx';

export const skinConfig = {
  header: {
    disclaimer: 'An official website of the United States Government',
    show_flag: true,
    links: [
      {
        text: 'About',
        url: 'https://cloud.gov/#about'
      },
      {
        text: 'Documentation',
        url: 'https://docs.cloud.gov'
      },
      {
        text: 'Updates',
        url: 'https://cloud.gov/updates/'
      },
      {
        text: 'Status',
        url: 'https://cloudgov.statuspage.io/'
      },
      {
        text: 'Contact',
        url: 'https://cloud.gov/#contact'
      }
    ]
  },
  docs: {
    cli: 'https://docs.cloud.gov/getting-started/setup/'
  },
  github: {
    url: 'https://github.com/18F/cg-dashboard'
  },
  home: {
    tiles: [HomeIntro, HomeCGStructure, HomeEnvironments, HomeSandbox, HomeAbout]
  }
};

const {getReference} = require('./components');

const Sidebar = [
  {
    type: 'doc',
    id: 'welcome-to-diem',
    customProps: {
      classNames: ['home'],
      icon: 'img/home.svg',
      iconDark: 'img/home-dark.svg',
    },
  },
  {
      type: 'category',
      label: 'Readme Backup',
      items: [
        {
          type: 'ref',
          id: 'readme.com/welcome-to-diem',
          customProps: {
            classNames: ['iconIndented'],
            icon: 'img/core-contributors.svg',
            iconDark: 'img/core-contributors-dark.svg',
          },
        },
      ]
  },
];

module.exports = Sidebar;

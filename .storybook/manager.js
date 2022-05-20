const { addons } = require('@storybook/addons');
const { themes } = require('@storybook/theming');

addons.setConfig({
  theme: {
    ...themes.dark,
    colorPrimary: '#2e7d32',
    colorSecondary: '#FF4785', // #1EA7FD
    brandTitle: 'Simple Organizer',
    brandImage: '/logo-horizontal.png'
  }
});

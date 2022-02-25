const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '#api': path.resolve(__dirname, 'src/api/'),
      '#components': path.resolve(__dirname, 'src/components/'),
      '#constants': path.resolve(__dirname, 'src/constants/'),
      '#utils': path.resolve(__dirname, 'src/utils/'),
    },
  },
};

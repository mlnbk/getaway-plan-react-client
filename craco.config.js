const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@Components': path.resolve(__dirname, 'src/Components/'),
      '@Pages': path.resolve(__dirname, 'src/Pages/'),
      '@Stores': path.resolve(__dirname, 'src/Stores/'),
      '@Utils': path.resolve(__dirname, 'src/Utils/'),
      '@types': path.resolve(__dirname, 'src/types.ts'),
    },
  },
};

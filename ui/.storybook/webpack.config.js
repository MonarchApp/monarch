const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: [
          path.resolve(__dirname, '../', 'src'),
          path.resolve(__dirname)
        ]
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '..', 'node_modules'),
      path.resolve(__dirname, '..', 'src')
    ],
    extensions: ['.js', '.scss', '*']
  },
};

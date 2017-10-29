const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'style.css'
    })
  ],
  resolve: {
    alias: {
      actions: path.resolve(__dirname , 'src', 'actions'),
      constants: path.resolve(__dirname , 'src', 'constants'),
      config: path.resolve(__dirname , 'src', 'config'),
      containers: path.resolve(__dirname , 'src', 'containers'),
      middleware: path.resolve(__dirname , 'src', 'middleware'),
      theme: path.resolve(__dirname, 'src', 'theme'),
      utils: path.resolve(__dirname, 'src', 'utils'),
    }
  },
  devServer: {
    contentBase: 'dist',
    historyApiFallback: true,
    host: 'localhost',
    inline: true,
    port: 3000
  }
};

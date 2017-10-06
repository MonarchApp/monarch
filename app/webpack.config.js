const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, 'src', 'index.js')
  ],
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
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'style.css'
    })
  ],
  resolve: {
    alias: {
      containers: path.resolve(__dirname , 'src', 'containers'),
      theme: path.resolve(__dirname, 'src', 'theme'),
    }
  },
  devServer: {
    contentBase: 'dist',
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    inline: true,
    port: 3000
  }
};

var path = require('path');
var webpack = require('webpack');
var ReactStylePlugin = require('react-style-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('bundle.css')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
          Common: path.join(__dirname, 'src/common'),
          Model:path.join(__dirname, 'src/model'),
          Store:path.join(__dirname, 'src/store'),
          mongoose:path.join(__dirname, 'src/models/index'),
          models:path.join(__dirname, 'model'),
          utils: path.join(__dirname, 'src/common/utils'),
          Component: path.join(__dirname, 'src/components')
      }
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: [path.join(__dirname, 'src'),path.join(__dirname, 'model')],
      query: {
        cacheDirectory: true,
        plugins: [
          "transform-runtime",
          "transform-decorators-legacy", 
          "react-hot-loader/babel"
        ],
        presets: ['es2015', 'react', 'stage-0']
      },
    }
    , {
      test: /\.css$/,
      loader:  'style!css?modules&localIdentName=[name]__[local]___[hash:base64:5]!less' 
    }
    ]
  }
};


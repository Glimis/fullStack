var path = require('path');
var webpack = require('webpack');
var ReactStylePlugin = require('react-style-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,  // remove all comments
      },
      compress: {
        warnings: false
      }
    })
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
      include: [path.join(__dirname, 'src'),path.join(__dirname, 'model')]
    }
    , {
      test: /\.css$/,
      loader:  'style!css?modules&localIdentName=[name]__[local]___[hash:base64:5]!less' 
    }
    ]
  }
};


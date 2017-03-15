var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var localhost="127.0.0.1"
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
    proxy: {  
        '/api': {  
            target: 'http://'+localhost+':3002',  
            secure: false ,
            pathRewrite: {'^/api' : ''}
        }  
    }
}).listen(3000, localhost, function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at '+localhost+':3000');
});

import  webpack from 'webpack'
import  webpackDevMiddleware from 'webpack-dev-middleware'
import  webpackHotMiddleware from 'webpack-hot-middleware'
import  webpackDevConfig from './webpack.config.js'
import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'

var  app = express();
 
app.use(express.static(__dirname + '/dist'));

var compiler = webpack(webpackDevConfig);


app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));

var port=3000;
var server=app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at http://%s:%s', host, port);
});
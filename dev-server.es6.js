import { app } from './app';

import config from './webpack.dev.config.es6';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const compiler = webpack( config );
const options = {
	publicPath: '/build',
	noInfo: true,
	historyApiFallback: true
};

app
	.use( webpackDevMiddleware( compiler, options ) )
	.use( webpackHotMiddleware( compiler ) );

process.nextTick( () => require( './server.es6' ) );

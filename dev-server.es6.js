import express from 'express';
import { app, server } from './app';

import config from './webpack.dev.config.es6';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import './app/listeners';

const compiler = webpack( config );
const options = {
	publicPath: '/build',
	noInfo: true,
	historyApiFallback: true
};

app
	.use( webpackDevMiddleware( compiler, options ) )
	.use( webpackHotMiddleware( compiler ) )
	.use( express.static( '.' ) )
	;

server.listen( 3000 );

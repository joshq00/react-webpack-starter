import express from 'express';
import { app, server } from './app';
import expstate from 'express-state';
expstate.extend( app );

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

import path from 'path';
import { render } from './src';
import TodoStore from './src/stores/todo-store';
app.get( '/todos.json', ( rq, rs ) => {
	rs.json( TodoStore.get() );
} );
app.get( '/', ( rq, rs ) => {
	let html = render();
	rs.expose( TodoStore.get(), 'TODOS' );
	rs.render( 'index.ejs', { html } );
} );


app.set( 'view engine', 'ejs' );
app.set( 'views', path.join( __dirname, 'app', 'views' ) );

server.listen( 3000 );

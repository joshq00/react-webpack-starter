import express from 'express';
import { app, server } from './app';
import './app/listeners';

app.use( express.static( '.' ) );

import path from 'path';
import { render } from './src';
import TodoStore from './src/stores/todo-store';

import expstate from 'express-state';
expstate.extend( app );

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

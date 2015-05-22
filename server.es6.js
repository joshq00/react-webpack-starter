import express from 'express';
import path from 'path';

import { app, server } from './app';
import TodoStore from './src/stores/todo-store';
import { render } from './src';
import './app/listeners';

app.use( express.static( '.' ) );

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

server.listen( process.env.PORT || 3000 );

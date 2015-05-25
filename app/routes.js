import { Router } from 'express';
import { render } from '../src';
import TodoStore from '../src/stores/todo-store';

const routes = new Router();

routes
	.get( '/', ( req, res ) => {
		let html = render();
		res.render( 'index', { html } );
	} )

	.get( '/cors', ( req, res ) => {
		res.json( {
			it: 'does',
			work: true
		} );
	} )

	.get( '/todos.json', ( req, res ) => {
		res.json( TodoStore.get() );
	} )

	.get( '/state.js', ( req, res ) => {
		res.expose( TodoStore.get(), 'TODOS' );
		res.type( '.js' ).send( res.locals.state.toString() );
	} )
	;

export default routes;

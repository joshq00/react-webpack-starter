import { Router } from 'express';
import React from 'react';
import Blah from '../src/todo/list.jsx';


import todoStore from '../src/stores/todo-store';
// import { init } from '../src/actions/todo-actions';
// init( [ { id: 0, title: 'zero' } ] );


const route = new Router();
const f = React.createFactory( Blah );
route.get( '/', ( rq, rs ) => {
	let reactOutput = React.renderToString(
		f( { todos: todoStore.get() } )
	);

	let ALL_TODOS = JSON
		.stringify( todoStore.get() )
		.replace( /<\//g, '<\\/' )
		.replace( /<!--/g, '<\\!--' );

	rs.render( 'index.ejs', { reactOutput, ALL_TODOS } );
} );
export default route;

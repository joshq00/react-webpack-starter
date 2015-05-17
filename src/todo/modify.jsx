import React from 'react';
import io from '../io';
import dispatcher from '../dispatcher';
import store from '../stores/todo-store';
global.dispatcher=dispatcher;
function addOne ( indx ) {
	// var title = '' + indx;
	var title = document.body.querySelector( 'input' ).value;
	io.emit( 'ADD_TODO', { title: title } );
}
function addMany ( num ) {
	while ( num-- ) {
		addOne( num );
	}
}
global.addMany = addMany;

let empty = ( () => {
	function remove ( id ) {
		io.emit( 'REMOVE_TODO', id );
		// let data = { type: 'CLICK_REMOVE_TODO', data: id };
		// dispatcher.dispatch( data );
	}
	function getId ( todo ) {
		return todo.id;
	}
	return () => store.get().map( getId ).reverse().forEach( remove );
} )();
global.empty = empty;

export default class Modifier extends React.Component {
	render () {
		return (
		<div>
			<button onClick={ () => empty() }>Empty</button>
			<button onClick={ () => addMany( 1 ) }>1</button>
			<button onClick={ () => addMany( 100 ) }>100</button>
			<button onClick={ () => addMany( 1000 ) }>1000</button>
		</div>
		);
	}
}

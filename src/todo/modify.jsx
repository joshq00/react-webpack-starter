import React from 'react';
import io from '../io';
import store from '../stores/todo-store';

function addOne ( indx ) {
	var title = '' + indx;
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
		socket.emit( 'REMOVE_TODO', id );
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

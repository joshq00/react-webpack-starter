import actions from './actions/todo-actions';
const BATCH_SIZE = 5000;

global.addEventListener( 'message', e => {
	// dispatcher.dispatch( e.data );
	let payload = e.data;
	let { type, data } = payload;
	switch ( type ) {
	case 'background_add':
		process.nextTick( () => add( data ) );
		break;
	case 'background_remove':
		process.nextTick( () => remove( data ) );
		break;
	}
} );

// worker.postMessage( { type: 'background_add', data: 25000 } )
function add ( toadd ) {
	var todos = [];
	for ( let i = 1; i <= toadd; i++ ) {
		todos.push( { title: 'Todo: ' + i } );
		if ( i % BATCH_SIZE === 0 ) {
			actions.clickAdd( todos );
			todos = [];
		}
	}
	if ( todos.length ) {
		actions.clickAdd( todos );
	}
}

// worker.postMessage( { type: 'background_remove', data: store.get().map( function ( t ) { return t.id; } ) } )
function remove ( todos ) {
	let ids = [];

	let i = todos.length;
	while ( i-- ) {
		ids.push( todos.pop() );
		// ids.push( todos.shift() );
		if ( i % BATCH_SIZE === 0 ) {
			actions.clickRemove( ids );
			ids = [];
		}
	}
	if ( ids.length ) {
		actions.clickRemove( ids );
	}
}

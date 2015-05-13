/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

/* store/actions */
import { init, add, remove } from 'actions/todo-actions';
import store from '../todo-store';

/* test modules */
import { expect } from 'chai';

function getLength () {
	return store.get().length;
}
function expectLength ( length ) {
	expect( getLength() ).to.equal( length );
}
describe( 'todo-store', function () {
	it( 'should be empty', () => {
		expectLength( 0 );
	} );

	it( 'should initialize', () => {
		// let length = getLength();
		let todos = [ {
			id: 1,
			title: 'One'
		}, {
			id: 2,
			title: 'Two'
		} ];

		init( todos );
		expectLength( 2 );

		// re-adding doesn't dupe
		todos.forEach( add );
		expectLength( 2 );

		// doesn't exist
		remove( 3 );
		expectLength( 2 );

		// remove first
		remove( 1 );
		expectLength( 1 );

		// remove second
		remove( 2 );
		expectLength( 0 );

		// add one
		add( todos[ 0 ] );
		expectLength( 1 );
	} );
} );

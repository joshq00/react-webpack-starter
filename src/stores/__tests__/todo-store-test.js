/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

/* store/actions */
import { init, add, remove } from '../../actions/todo-actions';
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
	/* empty store */
	beforeEach( () => init() );

	const todos = [ {
		id: 1,
		title: 'One'
	}, {
		id: 2,
		title: 'Two'
	} ];

	it( 'starts empty', () => {
		expectLength( 0 );
	} );

	it( 'initializes', () => {
		init( todos );
		expectLength( 2 );
	} );

	it( 'clears when initialized', () => {
		init( todos );
		expectLength( 2 );

		init( [] );
		expectLength( 0 );

		init( todos );
		expectLength( 2 );

		init();
		expectLength( 0 );
	} );

	it( 'adds todos', () => {
		init( todos );

		add( [ { id: 40, title: 'Another' } ] );
		expectLength( 3 );
	} );

	it( 'generates id', () => {
		add( [ { title: 'No ID' } ] );
		expectLength( 1 );
		expect( store.get()[ 0 ] ).to.have.property( 'id' ).that.is.a.number;
	} );

	it( 'replaces existing', () => {
		init( todos );

		add( [ { id: 1, title: 'replacement' } ] );
		expectLength( 2 );

		expect( store.getOne( 1 ) ).to.have.property( 'title', 'replacement' );
	} );

	it( 'does not duplicate', () => {
		add( todos );

		// re-adding doesn't dupe
		add( todos );
		expectLength( 2 );

		// doesn't exist
		remove( [ 3 ] );
		expectLength( 2 );

		// remove first
		remove( [ 1 ] );
		expectLength( 1 );

		// remove second
		remove( [ 2 ] );
		expectLength( 0 );

		// add one
		add( [ todos[ 0 ] ] );
		expectLength( 1 );
	} );
} );

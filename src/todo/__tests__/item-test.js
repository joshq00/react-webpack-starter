/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

/* store/actions */
import { add, remove } from 'actions/todo-actions';
import store from 'stores/todo-store';

/* test modules */
import { expect } from 'chai';
import React from 'react';
import {
	Simulate,
	renderIntoDocument,
	findAllInRenderedTree
} from 'react/lib/ReactTestUtils';
import rtu from 'react/lib/ReactTestUtils';

/* components */
import List from '../list';
import Item from '../item';


/* empties the store */
function emptyStore () {
	store.get().map( todo => todo.id ).forEach( remove );
}


describe( 'todo-list', () => {
	// let list, domnode;

	// function getItems () {
	// 	return domnode.querySelectorAll( '.todo-item' );
	// }

	// beforeEach( 're-render', () => {
	// 	list = renderIntoDocument(
	// 		<List todos={ store.get() } />
	// 	);
	// 	domnode = React.findDOMNode( list );

	// 	expect( getItems().length )
	// 		.to.equal( store.get().length )
	// 		.and
	// 		.to.equal( list.props.todos.length );
	// } );


	// it( 'should render', () => {
	// 	expect( domnode ).to.exist;
	// } );


	// /* remove all todos */
	// emptyStore();


	// /* add a few todos */
	// [
	// 	{ id: 0, title: 'Eat dinner' },
	// 	{ id: 1, title: 'Feed dog' },
	// 	{ id: 2, title: 'Take shower' }
	// ].forEach( add );


	// it( 'should have all todo-items', () => {
	// 	expect( getItems().length )
	// 		.to.equal( 3 )
	// 		.and
	// 		.to.equal( store.get().length );
	// } );


	// // it( 'should remove todos', () => {
	// // 	expect( getItems().length ).to.be.at.least( 1 );

	// // 	let isItem = inst => rtu.isCompositeComponentWithType( inst, Item );
	// // 	findAllInRenderedTree( list, isItem )
	// // 		.map( item => React.findDOMNode( item ) )
	// // 		.map( domitem => domitem.querySelector( '.remove' ) )
	// // 		.forEach( Simulate.click );

	// // 	expect( store.get().length ).to.equal( 0 );

	// // } );
	// it( 'should dispatch add', function ( done ) {
	// 	store.once( done );
	// 	add( { id: 123, title: 'hi' } );
	// } );
	// it( 'should have that todo', function () {
	// 	expect( store.get( 123 ) ).to.exist;
	// } );

	// it( 'should dispatch remove', function ( done ) {
	// 	store.once( done );
	// 	remove( 123 );
	// } );
} );
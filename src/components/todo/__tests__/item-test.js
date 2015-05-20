/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import dispatcher from '../../../dispatcher';

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


describe( 'todo-list', () => {
	let list, domnode;

	function getItems () {
		return domnode.querySelectorAll( '.todo-item' );
	}

	let todos = [];

	beforeEach( 're-render', () => {
		list = renderIntoDocument(
			<List todos={ todos } />
		);
		domnode = React.findDOMNode( list );
	} );


	it( 'renders', () => {
		expect( domnode ).to.exist;
	} );


	/* add a few todos */
	todos = [
		{ id: 0, title: 'Eat dinner' },
		{ id: 1, title: 'Feed dog' },
		{ id: 2, title: 'Take shower' }
	];


	it( 'has all todo-items', () => {
		expect( getItems().length )
			.to.equal( 3 )
			.and
			.to.equal( todos.length );
	} );


	describe( 'remove button', () => {

		it( 'dispatches CLICK_REMOVE_TODO', () => {
			let calls = 0;
			let token = dispatcher.register( pl => {
				let { type } = pl;
				switch ( type ) {
				case 'CLICK_REMOVE_TODO':
					calls++;
				}
			} );

			let isItem = inst => rtu.isCompositeComponentWithType( inst, Item );
			findAllInRenderedTree( list, isItem )
				.map( React.findDOMNode )
				.map( domitem => domitem.querySelector( '.remove' ) )
				.forEach( Simulate.click );

			expect( calls ).to.equal( 3 );
			dispatcher.unregister( token );
		} );
	} );
} );

/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import Store from '../';
import { Dispatcher } from 'flux';
import { GoodStore, BadStore } from './stores';

const dispatcher = new Dispatcher();
const store = new GoodStore( dispatcher );
const dispatch = () => dispatcher.dispatch( ...arguments );

/* test modules */
import { expect } from 'chai';
describe( 'store', () => {
	it( 'should require onAction', () => {
		expect( () => new BadStore( dispatcher ) ).to.throw( Error );
		expect( Store ).to.throw( Error );
	} );

	let obj;
	beforeEach( () => {
		obj = { calls: 0 };
		store.removeAllListeners();
	} );

	function increment () {
		obj.calls++;
	}

	it( 'should bind/unbind', () => {
		store.on( increment );
		expect( dispatch ).to.increase( obj, 'calls' );
		expect( dispatch ).to.increase( obj, 'calls' );
		store.off( increment );
		expect( dispatch ).to.not.increase( obj, 'calls' );
	} );

	it( 'should have optional eventname', () => {
		store.once( 'Useless input', increment );
		expect( dispatch ).to.increase( obj, 'calls' );
		expect( dispatch ).to.not.increase( obj, 'calls' );

		store.on( 'Useless input', increment );
		expect( dispatch ).to.increase( obj, 'calls' );
		expect( dispatch ).to.increase( obj, 'calls' );
	} );

	it( 'should waitFor', () => {
		let store2 = new GoodStore( dispatcher );
		let store3 = new GoodStore( dispatcher );

		store.on( () => {
			expect( obj.calls ).to.equal( 0 );
			store.waitFor( [ store2.token, store3.token ] );
			expect( obj.calls ).to.equal( 2 );
			increment();
		} );

		store2.on( () => {
			expect( obj.calls ).to.equal( 0 );
			store2.waitFor( store3.token );
			expect( obj.calls ).to.equal( 1 );
			increment();
		} );

		store3.on( increment );

		dispatch();

		expect( obj.calls ).to.equal( 3 );

		store2.destroy();
		store3.destroy();
	} );

} );

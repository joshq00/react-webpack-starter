/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import Store from '../';

const store = new Store();
const dispatch = () => store.emit();

/* test modules */
import { expect } from 'chai';
describe( 'store', () => {
	let obj;
	beforeEach( () => {
		obj = { calls: 0 };
		store.removeAllListeners();
	} );

	function increment () {
		obj.calls++;
	}

	it( 'needs to be called with `new`', () => {
		expect( Store ).to.throw( Error );
	} );

	it( 'binds/unbinds', () => {
		store.on( increment );
		expect( dispatch ).to.increase( obj, 'calls' );
		expect( dispatch ).to.increase( obj, 'calls' );
		store.off( increment );
		expect( dispatch ).to.not.increase( obj, 'calls' );
	} );

	it( 'has optional eventname', () => {
		store.once( 'Useless input', increment );
		expect( dispatch ).to.increase( obj, 'calls' );
		expect( dispatch ).to.not.increase( obj, 'calls' );

		store.on( 'Useless input', increment );
		expect( dispatch ).to.increase( obj, 'calls' );
		expect( dispatch ).to.increase( obj, 'calls' );
	} );

	it( 'removes all listeners on destroy', () => {
		store.once( increment );
		store.on( increment );
		store.on( increment );
		expect( dispatch ).to.increase( obj, 'calls' );

		store.once( increment );
		store.on( increment );
		store.destroy();
		expect( dispatch ).to.not.increase( obj, 'calls' );
	} );

} );

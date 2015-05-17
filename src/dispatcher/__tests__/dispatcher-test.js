/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import dispatcher from '../';
import { expect } from 'chai';
import { _extend } from 'util';

function spy ( fn ) {
	let invoker = ( ...args ) => {
		let val;
		invoker.args.push( args );
		invoker.callCount++;
		if ( invoker.fn ) {
			val = invoker.fn.apply( this, args );
		}
		invoker.vals.push( val );
		return val;
	};
	_extend( invoker, {
		callCount: 0,
		args: [],
		vals: [],
		fn
	} );
	return invoker;
}

describe( 'dispatcher', () => {

	it( 'sends actions to subscribers', () => {
		let fn = spy();

		dispatcher.register( fn );

		let payload = {};
		dispatcher.dispatch( payload );
		expect( fn.callCount ).to.equal( 1 );
		expect( fn.args[ 0 ][ 0 ] ).to.equal( payload );
	} );

	it( 'waits with chained dependencies properly', ( done ) => {
		let payload = {};
		let calledfirst = spy();
		let calledsecond = spy();
		let calledthird = spy();

		calledfirst.token = dispatcher.register( calledfirst );
		calledsecond.token = dispatcher.register( calledsecond );
		calledthird.token = dispatcher.register( calledthird );

		calledfirst.fn = () => {
			expect( calledthird.callCount ).to.equal( 0 );
			dispatcher.waitFor( [ calledthird.token ] );
			expect( calledthird.callCount ).to.equal( 1 );
			validate();
		};

		calledthird.fn = () => {
			expect( calledsecond.callCount ).to.equal( 0 );
			dispatcher.waitFor( [ calledsecond.token ] );
			expect( calledsecond.callCount ).to.equal( 1 );
		};

		dispatcher.dispatch( payload );

		function validate () {
			expect( calledfirst.callCount ).to.equal( 1 );
			expect( calledsecond.callCount ).to.equal( 1 );
			expect( calledthird.callCount ).to.equal( 1 );
			done();
		}

		after( () => {
			dispatcher.unregister( calledfirst.token );
			dispatcher.unregister( calledsecond.token );
			dispatcher.unregister( calledthird.token );
		} );
	} );
} );

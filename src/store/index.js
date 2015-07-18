import { EventEmitter } from 'events';

/**
 * Base `Store` class
 */
export default class Store extends EventEmitter {
	constructor ( ...args ) {
		super( ...args );
		this.emitNow = this.emitNow.bind( this );
	}
	/**
	 * Defer (async) emits.
	 *
	 * Disabled by default
	 *
	 * @param  {Number} ms how long to defer emit.
	 *                     null to disable
	 */
	defer ( ms ) {
		this._defer = ms;
	}
	/**
	 * Notify listeners that the store has changed.
	 */
	emitNow () {
		EventEmitter.prototype.emit.call( this, this.eventName );
		// super.emit( this.eventName );
	}
	emit () {
		if ( this._defer != null ) {
			clearTimeout( this._to );
			this._to = setTimeout( this.emitNow, this._defer );
			return;
		}
		this.emitNow();
	}

	/**
	 * Add a listener
	 *
	 * @param  {Function} fn callback to be fired
	 * @return {Store}
	 */
	on ( fn ) {
		if ( typeof arguments[ 0 ] === 'string' ) {
			fn = arguments[ 1 ];
		}
		this.addListener( this.eventName, fn );
		return this;
	}

	/**
	 * Add a one-time listener
	 *
	 * @param  {Function} fn callback to be fired
	 * @return {Store}
	 */
	once ( fn ) {
		if ( typeof arguments[ 0 ] === 'string' ) {
			fn = arguments[ 1 ];
		}
		super.once( this.eventName, fn );
		return this;
	}

	/**
	 * Remove a listener
	 *
	 * @param  {Function} fn callback to ignore
	 * @return {Store}
	 */
	off ( fn ) {
		this.removeListener( this.eventName, fn );
		return this;
	}

	removeAllListeners () {
		super.removeAllListeners( this.eventName );
		return this;
	}

	destroy () {
		this.removeAllListeners();
	}
}
Store.prototype.eventName = 'CHANGE';

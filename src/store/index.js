import { EventEmitter } from 'events';

/**
 * Base `Store` class
 */
export default class Store extends EventEmitter {
	/**
	 * Notify listeners that the store has changed.
	 */
	emit () {
		return super.emit( this.eventName );
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

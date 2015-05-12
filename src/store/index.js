import { EventEmitter } from 'events';

/**
 * Base `Store` class
 *
 * Children need to implement `onAction( payload ): void`
 */
export default class Store extends EventEmitter {
	constructor ( dispatcher ) {
		super();
		this.dispatcher = dispatcher;
		this.token = dispatcher.register( this.onAction.bind( this ) );

		if ( this.onAction === Store.prototype.onAction ) {
			throw new Error( 'Child class must implement `onAction( payload )`' );
		}
	}

	/**
	 * Handle action from dispatcher
	 *
	 * **Child class must implement!**
	 *
	 * @param  {any} payload data from dispatcher
	 */
	onAction ( payload ) {}

	/**
	 * Wait for other stores
	 *
	 * @param  {string[]} tokens of stores to wait for
	 */
	waitFor ( ids ) {
		if ( !Array.isArray( ids ) ) {
			ids = Array.prototype.slice.call( arguments, 0 );
		}
		this.dispatcher.waitFor( ids );
	}

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
		this.addListener( fn );
		return this;
	}

	/**
	 * Add a one-time listener
	 *
	 * @param  {Function} fn callback to be fired
	 * @return {Store}
	 */
	once ( fn ) {
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
		this.removeListener( fn );
		return this;
	}

	addListener ( fn ) {
		super.addListener( this.eventName, fn );
		return this;
	}

	removeListener ( fn ) {
		super.removeListener( this.eventName, fn );
		return this;
	}

	removeAllListeners () {
		super.removeAllListeners( this.eventName );
		return this;
	}

	destroy () {
		this.removeAllListeners();
		this.dispatcher.unregister( this.token );
		delete this.dispatcher;
	}
}
Store.prototype.eventName = 'CHANGE';

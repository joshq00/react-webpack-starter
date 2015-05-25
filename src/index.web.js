/* listen to socket.io */
import { listen } from './io';
listen();


/* initialize todo-store */
import { init } from './actions/todo-actions';
init( global.TODOS || [] );
delete global.TODOS;
import TodoStore from './stores/todo-store';
// TodoStore.defer( 125 );

// https://github.com/petehunt/react-raf-batching
// import ReactRAFBatching from './ReactRAFBatching';
// ReactRAFBatching.inject();

/* render application */
import React from 'react';
import App from './components/app';
export const app = React.render( <App />, document.querySelector( 'main' ) );


/* debug mode - hot reload */
if ( module.hot ) {
	require( './hot-reload' )( app );
}

import dispatcher from './dispatcher';
import constants from './constants/todo-constants';
import store from './stores/todo-store';
import actions from './actions/todo-actions';
import io from './io';

store.defer( 50 );
global.app = app;
global.dispatcher = dispatcher;
global.constants = constants;
global.store = store;
global.actions = actions;
global.socket = io();
global.process = process;

import Worker from 'worker!./worker';
global.worker = new Worker();

/*
var ReactUpdates = global.ReactUpdates = require( 'react/lib/ReactUpdates' );

var rafBatchingStrategy = {
	isBatchingUpdates: true,
	batchedUpdates: function ( callback, param ) {
		callback( param );
	}
};

var tick = function () {
	ReactUpdates.flushBatchedUpdates();
	setTimeout( () => requestAnimationFrame( tick ), 250 );
};

requestAnimationFrame( tick );

ReactUpdates.injection.injectBatchingStrategy( rafBatchingStrategy );
*/
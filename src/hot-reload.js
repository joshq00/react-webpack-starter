import dispatcher from './dispatcher';
import constants from './constants/todo-constants';
import store from './stores/todo-store';
import actions from './actions/todo-actions';
import io from './io';

global.dispatcher = dispatcher;
global.constants = constants;
global.store = store;
global.actions = actions;
global.socket = io();
global.process = process;

export default function hotReload ( app ) {
	let cfg = {
		getRootInstances: function () {
			// Help React Hot Loader figure out the root component instances on the page:
			return [ app ];
		}
	};
	let inject = require( 'react-hot-loader/Injection' ).RootInstanceProvider.injectProvider;
	inject( cfg );
}

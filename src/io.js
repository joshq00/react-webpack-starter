import io from 'socket.io-client';
import dispatcher from './dispatcher';

let websocket;
export default function getSocket () {
	if ( websocket == null ) {
		websocket = io();
	}
	return websocket;
}

export let listening = false;

function dispatch ( packet ) {
	if ( !packet || !packet.data ) {
		return;
	}
	let [ type, data ] = packet.data;
	dispatcher.dispatch( {
		type,
		data
	} );
}

export function listen () {
	if ( listening ) {
		return;
	}
	global.io = getSocket();
	let manager = getSocket().io;
	manager.on( 'packet', dispatch );
	listening = true;
}


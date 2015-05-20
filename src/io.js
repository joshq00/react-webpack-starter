import io from 'socket.io-client';
import dispatcher from './dispatcher';

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

let listening = false;
export function listen () {
	if ( listening ) {
		return;
	}
	let manager = io().io;
	manager.on( 'packet', dispatch );
	listening = true;
}

export default io;

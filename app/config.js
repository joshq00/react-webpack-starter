import path from 'path';
function addSettings ( app ) {
	app.set( 'view engine', 'ejs' );
	app.set( 'views', path.join( __dirname, 'views' ) );
}

import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import allowOrigin from './allow-origin';
function addMiddleware ( app ) {
	app.use( allowOrigin( [ {
		test: /[/][/](?:.+\.)?homedepot\.com$/i
	}, {
		test: /^https?:[/][/]localhost(:\d+)?$/i
	} ] ) );

	// gzip
	app.use( compression() );
	// parse json body
	app.use( bodyParser.json() );
	// parse url encoded form
	app.use( bodyParser.urlencoded( { extended: false } ) );

	// allow X-HTTP-Method-Override
	app.use( methodOverride() );
	// parse cookies
	app.use( cookieParser() );
}

import express from 'express';
import routes from './routes';
function addRouting ( app ) {
	// route binding
	app.use( routes );
	app.use( express.static( '.' ) );
}

function addErrorHandlers ( app ) {
	// error handler
	app.use( ( err, req, res, next ) => {
		if ( err.status ) {
			res.sendStatus( err.status );
			return;
		}
		next();
	} );
}

export default function configure ( app ) {
	addSettings( app );
	addMiddleware( app );
	addRouting( app );
	addErrorHandlers( app );
}

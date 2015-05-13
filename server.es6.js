import express from 'express';
import { app, server } from './app';
import './app/listeners';

app
	.use( express.static( '.' ) )
	;

server.listen( 3000 );

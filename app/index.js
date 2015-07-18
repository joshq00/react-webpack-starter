import express from 'express';
import expstate from 'express-state';
import socketio from 'socket.io';
import { Server } from 'http';
import config from './config';

const app = express();
expstate.extend( app );

const server = new Server( app );
const io = socketio( server );

export default {
	app,
	config,
	io,
	server
};

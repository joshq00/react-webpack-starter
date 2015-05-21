import express from 'express';
import expstate from 'express-state';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';

const app = express();
expstate.extend( app );

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

export default app;

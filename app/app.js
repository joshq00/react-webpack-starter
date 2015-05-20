import express from 'express';
import expstate from 'express-state';

const app = express();
expstate.extend( app );

export default app;

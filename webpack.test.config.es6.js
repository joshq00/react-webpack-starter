import orig from './webpack.config.es6';

let extend = Object.assign;
let cfg = extend( {}, orig );

// don't externalize any
cfg.externals = [];

cfg.module = extend( {}, cfg.module );
// add coverage postloader
cfg.module.postLoaders = [
	...( cfg.module.postLoaders || [] ),
	{ // << add subject as webpack's postloader
		test: /\.jsx?$/,
		exclude: /(__tests__|node_modules|bower_components)/,
		loader: 'istanbul-instrumenter'
	}
];

export default cfg;

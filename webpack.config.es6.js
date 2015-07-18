import webpack from 'webpack';
import path from 'path';
const target = 'web';

let entry = {
	index: 'index'
};

let output = {
	path: path.join( __dirname, 'build' ),
	publicPath: '/build/',
	filename: '[name].js'
};

let externals = {
	'socket.io-client': 'io',
	'react': 'React'
};

let loaders = [ {
	test: /\.(jsx?|es6)$/,
	loaders: [
		'babel?optional=runtime'
	],
	exclude: /node_modules/
}, {
	test: /\.json$/,
	loader: 'json'
}, {
	test: /\.less$/,
	loaders: [ 'style', 'css', 'less' ]
} ];

let resolve = {
	modulesDirectories: [
		'src',
		'web_modules',
		'node_modules'
	],
	extensions: [
		'',
		'.web.js',
		'.js',
		'.jsx',
		'.web.es6',
		'.es6',
		'.json'
	]
};

let plugins = [
	new webpack.optimize.DedupePlugin(),
	new webpack.DefinePlugin( {
		'process.browser': true
	} )
	// new webpack.optimize.CommonsChunkPlugin( 'common.js' )
];

let node = {
	console: false,
	// process: false,
	Buffer: false
};

export default {
	target,
	module: { loaders },
	entry,
	output,
	externals,
	resolve,
	node,
	plugins,
	worker: {
		output: {
			filename: 'worker.js',
			chunkFilename: '[id].hash.worker.js'
		},
		externals: [ 'socket.io-client', 'flux', 'socket.io' ]
	}
};

// Karma configuration
// Generated on Fri May 08 2015 10:26:24 GMT-0400 (Eastern Daylight Time)
require( 'babel/register' );
var extend = require( 'util' )._extend;
var webpackCfg = extend( {}, require( './webpack.config.es6' ) );
webpackCfg.devtool = 'inline-source-map';
webpackCfg.module = extend( {}, webpackCfg.module );
extend( webpackCfg.module, {
	postLoaders: [ { // << add subject as webpack's postloader
		test: /\.js$/,
		exclude: /(__tests__|node_modules|bower_components)/,
		loader: 'istanbul-instrumenter'
	} ]
} );
console.log( webpackCfg.module );

module.exports = function ( config ) {
	config.set( {

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: [ 'PhantomJS'/*, 'Chrome', 'IE'*/ ],


		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: [ 'mocha' ],


		// list of files / patterns to load in the browser
		files: [
			'./node_modules/phantomjs-polyfill/bind-polyfill.js',
			'./node_modules/babel-core/browser-polyfill.js',
			// 'tests.webpack.js'
			{
				// pattern: 'src/**/__tests__/*-test.js'
				pattern: 'src/**/__tests__/*-test.js'
			}
		],


		// list of files to exclude
		exclude: [],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			// 'tests.webpack.js': [ 'webpack', 'sourcemap', 'coverage' ]
			'src/**/__tests__/*-test.js': [ 'webpack' ]
			// 'src/**/!(__tests__)/*.js': [ 'webpack', 'coverage' ],
			// 'src/**/*.js': [ 'webpack' ],
			// 'src/**/*.jsx': [ 'webpack' ]
		},

		webpack: webpackCfg,

		webpackServer: {
			noInfo: true
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		// reporters: [ 'progress' ],
		reporters: [ 'progress', 'coverage' ],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		// logLevel: config.LOG_INFO,
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false

	} );
};

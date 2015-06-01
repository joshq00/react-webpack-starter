// start these browsers
// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
let browsers = [ 'PhantomJS'/*, 'Chrome', 'IE'*/ ];

// base path that will be used to resolve all patterns (eg. files, exclude)
let basePath = '';


// frameworks to use
// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
let frameworks = [ 'mocha' ];


// list of files / patterns to load in the browser
let files = [
	'./node_modules/phantomjs-polyfill/bind-polyfill.js',
	'./node_modules/babel-core/browser-polyfill.js',
	// 'tests.webpack.js'
	{
		// pattern: 'src/**/__tests__/*-test.js'
		pattern: 'src/**/__tests__/*-test.js'
	}
];


// list of files to exclude
let exclude = [];


// preprocess matching files before serving them to the browser
// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
let preprocessors = {
	// 'tests.webpack.js': [ 'webpack', 'sourcemap', 'coverage' ]
	'src/**/__tests__/*-test.js': [ 'webpack' ]
	// 'src/**/!(__tests__)/*.js': [ 'webpack', 'coverage' ],
	// 'src/**/*.js': [ 'webpack' ],
	// 'src/**/*.jsx': [ 'webpack' ]
};

import webpack from './webpack.test.config.es6';
let webpackServer = {
	noInfo: true
};


// test results reporter to use
// possible values: 'dots', 'progress'
// available reporters: https://npmjs.org/browse/keyword/karma-reporter
// reporters: [ 'progress' ],
let reporters = [ 'progress', 'html', 'coverage' ];


// web server port
let port = 9876;


// enable / disable colors in the output (reporters and logs)
let colors = true;


// enable / disable watching file and executing tests whenever any file changes
let autoWatch = true;


// Continuous Integration mode
// if true, Karma captures browsers, runs the tests and exits
let singleRun = false;


export default function ( config ) {
	config.set( {
		browsers,
		basePath,
		frameworks,
		files,
		exclude,
		preprocessors,
		webpack,
		webpackServer,
		reporters,
		port,
		colors,
		autoWatch,
		singleRun,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		// logLevel: config.LOG_INFO,
		logLevel: config.LOG_INFO
	} );
}

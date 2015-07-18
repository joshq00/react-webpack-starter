const any = /.?/;

function originAllowed ( originTesters, origin ) {
	return originTesters.filter( tester => {
		let matcher = tester.test || any;
		let excluder = tester.exclude;
		if ( excluder && excluder.test( origin ) ) {
			return false;
		}
		return matcher.test( origin );
	} ).length > 0;
}

export default function allowOrigins ( testers ) {
	return ( req, res, next ) => {
		let origin = req.header( 'Origin' );

		if ( origin == null ) {
			return next();
		}

		if ( !originAllowed( testers, origin ) ) {
			let err = new Error();
			err.status = 403;
			throw err;
		}

		res.header( 'Access-Control-Allow-Origin', origin );
		res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
		next();
	};
}

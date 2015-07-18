// <script src='node_modules/xlsx/dist/xlsx.full.min.js'></script>
class FileInfo extends React.Component {
	constructor ( ...args ) {
		super( ...args );
		this.state = {};
	}
	updfil ( file ) {
		let info = [
			`name: "${ file.name }"`,
			`size: ${ file.size }`,
			`type: "${ file.type }"`,
			`lastModified: ${ file.lastModified }`,
			`lastModifiedDate: ${ file.lastModifiedDate }`
		].join( '\n' );
		this.setState( { info } );

		let bindEvents = ( name, reader ) => {
			reader.onload = () => this.setState( { [name]: reader.result } );
			reader.onerror = () => this.setState( { [name]: 'ERROR' + reader.result } );
		};

		let fr;

		fr = new FileReader();
		fr.readAsText( file );
		bindEvents( 'text', fr );

		// fr = new FileReader();
		// fr.readAsArrayBuffer( file );
		// bindEvents( 'arrayBuffer', fr );

		if ( file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ) {
			let fr = new FileReader();
			fr.onload = ( e ) => {
				let data = e.target.result;
				/* globals XLSX */
				let wb = XLSX.read( data, { type: 'binary' } );
				window.wb = wb;
			};
			fr.readAsBinaryString( file );
		}
		// bindEvents( 'binaryString', fr );

		// fr = new FileReader();
		// fr.readAsDataURL( file );
		// bindEvents( 'dataURL', fr );
	}
	componentWillReceiveProps ( nextProps ) {
		this.updfil( nextProps.file );
	}
	componentDidMount () {
		this.updfil( this.props.file );
	}
	render () {
		return (
		<div>
			<pre>------------------------------</pre>
			<pre>{ this.state.info }</pre>
			<pre>------------------------------</pre>
			<pre>{ this.state.text }</pre>
			<pre>{'\n\n'}</pre>
		</div>
		);
	}
}
FileInfo.propTypes = {
	file: React.PropTypes.object.isRequired
};

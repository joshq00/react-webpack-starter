import React from 'react';

export default class App extends React.Component {
	constructor ( props ) {
		super( props );
		this.state = {};
	}
	render () {
		return (
		<div>
			Welcome to { this.props.title }!
		</div>
		);
	}
}
App.propTypes = {
	title: React.PropTypes.string.isRequired
};
App.defaultProps = {
	title: 'App title'
};

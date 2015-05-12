import React from 'react';
import { ADD } from 'actions/todo-actions';
import io from 'io';
let add = todo => io.emit( ADD, todo );

export default class TodoForm extends React.Component {
	constructor ( props ) {
		super( props );

		this.onChange = this.onChange.bind( this );
		this.onSubmit = this.onSubmit.bind( this );

		this.state = { id: null, title: null };
	}

	onChange ( e ) {
		let title = e.target.value;
		this.setState( { title } );
	}

	onSubmit ( e ) {
		add( this.state );
		this.setState( { id: null, title: null } );
		e.preventDefault();
	}

	render () {
		return (
		<form onSubmit={ this.onSubmit }>
			inp: <input
				onChange={ this.onChange }
				value={ this.state.title }
				/>
			<button>Add</button>
		</form>
		);
	}
}

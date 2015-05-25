import React from 'react';
import { clickAdd as addTodos } from '../../actions/todo-actions';

export default class TodoForm extends React.Component {
	constructor ( props ) {
		super( props );

		this.onChange = this.onChange.bind( this );
		this.onSubmit = this.onSubmit.bind( this );

		this.state = props.todo || {};
	}

	componentWillReceiveProps ( nextProps ) {
		let { id, title } = nextProps.todo || {};
		this.setState( { id, title } );
	}

	onChange ( e ) {
		let title = e.target.value;
		this.setState( { title } );
	}

	onSubmit ( e ) {
		let { id, title } = this.state;
		addTodos( [ { id, title } ] );
		this.setState( { id: null, title: null } );
		e.preventDefault();
	}

	render () {
		return (
		<form onSubmit={ this.onSubmit }>
			inp: <input
				onChange={ this.onChange }
				placeholder={ 'Do dishes' }
				value={ this.state.title }
				/>
			<button>Add</button>
		</form>
		);
	}
}

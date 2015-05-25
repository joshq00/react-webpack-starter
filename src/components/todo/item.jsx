import React from 'react';
import { click, clickRemove } from '../../actions/todo-actions';

export default class TodoItem extends React.Component {
	constructor ( props ) {
		super( props );
		this._remove = this._remove.bind( this );
		this._select = this._select.bind( this );
	}

	_remove ( e ) {
		e.preventDefault();
		e.stopPropagation();

		let { todo } = this.props;
		clickRemove( [ todo.id ] );
	}

	_select () {
		click( this.props.todo );
	}

	render () {
		let { todo } = this.props;
		return (
		<div className='todo-item' onClick={ this._select }>
			<button
				className='remove'
				onClick={ this._remove } >
				X
			</button>

			{ todo.id } - { todo.title }
		</div>
		);
	}
}

TodoItem.propTypes = {
	todo: React.PropTypes.shape( {
		id: React.PropTypes.number.isRequired,
		title: React.PropTypes.any.isRequired
	} )
};

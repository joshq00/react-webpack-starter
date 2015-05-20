import React from 'react';
import { clickRemove } from '../../actions/todo-actions';

export default class TodoItem extends React.Component {
	constructor ( props ) {
		super( props );
		this._remove = this._remove.bind( this );
	}

	_remove () {
		let { todo } = this.props;
		clickRemove( todo );
	}

	render () {
		let { todo } = this.props;
		return (
		<div className='todo-item'>
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

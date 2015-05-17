import React from 'react';
// import { REMOVE } from '../actions/todo-actions';
// import io from '../io';
// let remove = id => io.emit( REMOVE, id );
// import dispatcher from '../dispatcher';
// let remove = id => dispatcher.dispatch( { type: 'CLICK_REMOVE_TODO', data: id } );

import { clickRemove } from '../actions/todo-actions';
// import {
// 	removeTodo
// } from '../utils/todo-api-utils';

export default class TodoItem extends React.Component {
	constructor ( props ) {
		super( props );
		this._remove = this._remove.bind( this );
	}
	_remove () {
		let { todo } = this.props;
		// TodoActions.remove( [ todo.id ] );
		// removeTodo( todo.id );
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

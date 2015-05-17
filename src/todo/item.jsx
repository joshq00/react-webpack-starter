import React from 'react';
// import { REMOVE } from '../actions/todo-actions';
// import io from '../io';
// let remove = id => io.emit( REMOVE, id );
import dispatcher from '../dispatcher';
let remove = id => dispatcher.dispatch( { type: 'CLICK_REMOVE_TODO', data: id } );

export default class TodoItem extends React.Component {
	render () {
		let { todo } = this.props;
		return (
		<div className='todo-item'>
			<button
				className='remove'
				onClick={ () => remove( todo.id ) } >
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

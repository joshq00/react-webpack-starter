import React from 'react';
import Item from './item';

export default class TodoList extends React.Component {
	render () {
		let { todos, limit } = this.props;
		let items = slice( todos, limit )
			.map( todo =>
				<Item key={ todo.id } todo={ todo } />
			);

		return (
		<div className='todo-list'>
			{ items }
		</div>
		);
	}
}
TodoList.slice = slice;
TodoList.defaultProps = {
	limit: 100
};
TodoList.propTypes = {
	limit: React.PropTypes.number,
	todos: React.PropTypes.instanceOf( Map ).isRequired
};

function slice ( map, limit ) {
	let items = [];
	for ( let todo of map.values() ) {
		if ( limit-- <= 0 ) {
			break;
		}
		items.push( todo );
	}
	return items;
}

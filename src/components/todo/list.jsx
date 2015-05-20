import React from 'react';
import Item from './item';

export default class TodoList extends React.Component {
	render () {
		let Todo = ( todo, i ) =>
			<Item key={ todo.id } todo={ todo } />;

		let { todos } = this.props;
		return (
		<div className='todo-list'>
			<div>{ todos.length }</div>
			{ todos.slice( 0, 100 ).map( Todo ) }
		</div>
		);
	}
}

TodoList.propTypes = {
	todos: React.PropTypes.array.isRequired
};

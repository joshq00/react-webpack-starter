let i = 1;
function getNextId () {
	return i++;
}
export default class Todo {
	constructor ( { id, title } ) {
		if ( id == null ) {
			id = getNextId();
		}

		this.id = id;
		this.title = title;
	}
}

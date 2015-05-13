import Store from '../';
export class BadStore extends Store {}
export class GoodStore extends Store {
	onAction () {
		super.onAction();
		this.emit();
	}
}

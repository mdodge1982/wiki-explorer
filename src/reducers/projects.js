import {combineReducers} from 'redux';

const project = (state, action) => {
	switch (action.type) {
	case 'CUPCAKES_MOVE':
		const wait = state.wait ? state.wait-1 : 0;
		return {
			...state,
			xPos: 0,
			yPos: 0,
			wait
		};
	case 'CUPCAKES_FROST':
		return {
			...state,
			frosted: action.success ? 'frosted' : 'failed',
			wait: 20,
			destination: action.destination
		};
	case 'CUPCAKES_TRASH':
		return {
			...state,
			trashed: true
		};
	default:
		return state
	}
}

const allNames = (state = [], action) => {
	switch (action.type) {
		case 'PROJECT.LIST':
			return action.data;
		default:
			return state
	}
}

const visibleNames = (state = [], action) => {
	switch (action.type) {
		case 'CUPCAKES_ADD':
			return [
				...state,
				action.id
			]
		case 'CUPCAKES_REMOVE':
			return state.filter(id => id!==action.id);
		default:
			return state
	}
}

export default combineReducers({
	allNames,
	visibleNames
});

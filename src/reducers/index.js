import {combineReducers} from 'redux';

const project = (state = {}, action) => {
	switch (action.type) {
		case 'PAGE.LIST':
			return {
				...state,
				isFetching: false,
				pages: action.data
			};
		case 'REQUEST_PAGE.LIST':
			return {
				...state,
				isFetching: true
			};
		case 'SELECT_PROJECT':
			return {
				...state,
				selected: action.id===state.name
			};
		case 'DESELECT_PROJECT':
			return {
				...state,
				selected: false
			};
		default:
			return state
	}
}

const byName = (state = {}, action) => {
	switch (action.type) {
		case 'PROJECT.LIST':
			action.data.forEach((name) => {
				state[name] = {
					name,
					pages: []
				}
			});
			return state;
		case 'SELECT_PROJECT':
			const curSelected = state.selected;
			const newState = {
				...state,
				[action.id]: project(state[action.id], action),
				selected: action.id
			};
			if(curSelected){
				newState[curSelected] = project(state[curSelected], action);
			}
			return newState;
		case 'DESELECT_PROJECT':
			return {
				...state,
				[action.id]: project(state[action.id], action),
				selected: null
			};
		default:
			if(action.id&&state[action.id]){
				return {
					...state,
					[action.id]: project(state[action.id], action)
				};
			}
			return state
	}
};

const allNames = (state = [], action) => {
	switch (action.type) {
		case 'PROJECT.LIST':
			return action.data;
		default:
			return state
	}
};

export default combineReducers({
	byName,
	allNames
});

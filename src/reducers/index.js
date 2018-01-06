import {combineReducers} from 'redux';

const selectedPage = (state = {}, action) => {
	switch (action.type) {
		case 'PAGE.QUERY':
		case 'PAGE.UPDATE':
			return action.data;
		case 'CLEAR_SELECTED_PAGE':
			return {};
		default:
			return state;
	}
}

const project = (state = {}, action) => {
	switch (action.type) {
		case 'PAGE.LIST':
			return {
				...state,
				isFetching: false,
				pages: action.data
			};
		case 'PROJECT.UPDATE':
			let newPages = [];
			if(action.data.length===1){
				//if project.update contains 1 page, assume it's a merge
				const updatedPage = action.data[0];
				let isBrandNew = true;
				state.pages.forEach((page) => {
					if(page.pageid===updatedPage.pageid){
						isBrandNew = false;
						newPages.push(updatedPage);
					}else{
						newPages.push(page);
					}
				});
				if(isBrandNew){
					newPages.push(updatedPage);
				}
			}else{
				//If there are multiple pages, assume it's a replace
				newPages = action.data;
			}
			return {
				...state,
				isFetching: false,
				pages: newPages
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
		case 'PROJECT.UPDATE':
			if(state.selected){
				return {
					...state,
					[state.selected]: project(state[state.selected], action)
				};
			}
			return state;
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
	allNames,
	selectedPage
});

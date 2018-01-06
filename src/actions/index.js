
const socket = new WebSocket("wss://wiki-meta-explorer.herokuapp.com");

const listentoSocket = () => {
	return (dispatch,getState) => {
		socket.addEventListener('message',(e) => {
			//Convert socket message to redux event
			const message = JSON.parse(e.data);
			dispatch({
				type: message.name.toUpperCase(),
				id: message.id,
				data: message.data
			});
		});
	};
};

const socketRequest = (requestData) => {
	//Is the socket ready?
	const p = new Promise((resolve,reject) => {
		if(socket.readyState===1){
			resolve();
		}else{
			socket.addEventListener('open',resolve);
		}
	}).then(() => {
		socket.send(JSON.stringify(requestData));
	});
	return p;
};


socket.onopen = () => {
	//Keep the socket open by pinging
	setInterval(() => {
		socketRequest({
			id: 'ping',
			name: 'ping'
		});
	},20000);
};

const requestSocket = (requestData) => {
	return (dispatch,getState) => {
		//Notify that a request has been started
		dispatch({
			type: 'REQUEST_'+requestData.name.toUpperCase(),
			id: requestData.id
		});
		return socketRequest(requestData);
	};
};

const fetchProjects = () => {
	return requestSocket({
		id: 'allpages',
		name: 'project.list'
	});
};

const fetchPages = (projectName) => {
	return requestSocket({
		id: projectName,
		name: 'page.list',
		args: {
			project: projectName
		}
	});
};

const toggleProjectSubscription = (projectName,subscribe) => {
	const suffix = subscribe ? 'subscribe' : 'unsubscribe';
	return requestSocket({
		id: projectName,
		name: 'project.'+suffix,
		args: {
			project: projectName
		}
	});
};

const togglePageSubscription = (pageId,subscribe) => {
	const suffix = subscribe ? 'subscribe' : 'unsubscribe';
	return requestSocket({
		id: pageId,
		name: 'page.'+suffix,
		args: {
			pageId
		}
	});
};

const selectProject = (projectName) => {
	return (dispatch,getState) => {
		const {byName} = getState();
		const project = byName[projectName];
		let type = 'SELECT_PROJECT';
		if(project.selected){
			type = 'DESELECT_PROJECT'
		}else{
			//Fetch the pages if there are none yet
			if(project.pages.length===0){
				dispatch(fetchPages(projectName));
			}
			//subscribe to the newly selected project
			dispatch(toggleProjectSubscription(projectName,true));
		}
		if(byName.selected){
			//unsubscribe from the old selected project
			const oldProject = byName[byName.selected];
			dispatch(toggleProjectSubscription(oldProject.name,false));
		}
		dispatch({
			type,
			id: projectName
		});
	};
}

const fetchPage = (pageId) => {
	return (dispatch,getState) => {
		dispatch(requestSocket({
			id: pageId,
			name: 'page.query',
			args: {
				pageId
			}
		}));
		dispatch(togglePageSubscription(pageId,true));
	}
}

const clearSelectedPage = () => {
	return (dispatch,getState) => {
		const {selectedPage} = getState();
		dispatch(togglePageSubscription(selectedPage.pageid,false));
		dispatch({
			type: 'CLEAR_SELECTED_PAGE'
		});
	};

}

export {listentoSocket,fetchProjects,selectProject,fetchPage,clearSelectedPage};

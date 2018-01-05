
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

const requestSocket = (requestData) => {
	return (dispatch,getState) => {
		//Notify that a request has been started
		dispatch({
			type: 'REQUEST_'+requestData.name.toUpperCase(),
			id: requestData.id
		});
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

const selectProject = (projectName) => {
	return (dispatch,getState) => {
		//Fetch the pages if there are none yet
		const {byName} = getState();
		const project = byName[projectName];
		if(project.pages.length===0){
			dispatch(fetchPages(projectName));
		}
		dispatch({
			type: 'SELECT_PROJECT',
			name: projectName
		});
	};
}

export {listentoSocket,fetchProjects,selectProject};

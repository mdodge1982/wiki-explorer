
const socket = new WebSocket("wss://wiki-meta-explorer.herokuapp.com");

const listentoSocket = () => {
	return (dispatch,getState) => {
		socket.addEventListener('message', function (e) {
			const message = JSON.parse(e.data);
			dispatch({
				type: message.name.toUpperCase(),
				data: message.data
			});
		});
	};
};

const requestSocket = (requestData,cb) => {
	if(socket.readyState===1){
		//TODO refactor using promise
		socket.send(JSON.stringify({id:'md123',...requestData}));
		cb();
	}else{
		socket.addEventListener('open', () => {
			socket.send(JSON.stringify({id:'md123',...requestData}));
			cb();
		});
	}
};

const fetchProjects = () => {
	return (dispatch,getState) => {
		requestSocket({name: 'project.list'}, () => {
		});
	};
}

export {fetchProjects,listentoSocket};

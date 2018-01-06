import React, {Component} from 'react';

class Loading extends Component {
	constructor(props) {
		super(props);
		const int = setInterval(() => {
			let newContent = '';
			if(this.state.content!=='...'){
				newContent = this.state.content+'.';
			}
			this.setState({content: newContent});
		},100);
		this.state = {
			content: '',
			int
		};
	}
	render() {
		return (
			<span>{this.state.content}</span>
		)
	}
	componentWillUnmount() {
		console.log('component unmount');
		clearInterval(this.state.int);
	}
}

export default Loading;

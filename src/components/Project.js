import React, {Component} from 'react';
import './Project.css';

class Project extends Component {
	render() {
		var attrs = {};
		if(this.props.isNewIdx){
			attrs.id = this.props.project.charAt(0);
		}
		return (
			<li {...attrs}>{this.props.project}</li>
		);
	}
}

export default Project;

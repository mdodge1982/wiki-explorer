import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectProject} from '../actions';
import Pages from './Pages';
import './Project.css';

class ProjectComponent extends Component {
	render() {
		const project = this.props.project;
		const attrs = {};
		let className = 'Project';
		if(this.props.isNewIdx){
			attrs.id = project.name.charAt(0);
			className += ' jump-link';
		}
		let content = '';
		if(project.pages.length>0){
			content = (
				<Pages pages={project.pages} />
			)
		}
		if(project.selected){
			className += ' open';
		}
		if(project.isFetching){
			className += ' red';
		}
		return (
			<li {...attrs} className={className}>
				<h4 onClick={() => this.handleClick(project.name)}>{project.name}</h4>
				{content}
			</li>
		);
	}
	handleClick(projectName) {
		this.props.dispatch(selectProject(projectName));
	}
}

//Use connect to get state and dispatch
const mapStateToProps = ({byName},ownprops) => {
	const project = byName[ownprops.projectName];
	return {project};
}
const Project = connect(mapStateToProps)(ProjectComponent);

export default Project;

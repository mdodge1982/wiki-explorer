import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Projects.css';
import {listentoSocket,fetchProjects} from '../actions';
import Project from './Project';

class ProjectsComponent extends Component {
	constructor(props) {
		super(props);
		props.dispatch(listentoSocket());
		props.dispatch(fetchProjects());
	}

	render() {
		//Create an index for navigating the long list of projects
		const idxArr = [];
		let curIdx = '';
		//Create the li's
		const projects = this.props.allNames.map(projectName => {
			let isNewIdx = false;
			if(projectName.charAt(0)!==curIdx){
				//New letter for the index
				isNewIdx = true;
				curIdx = projectName.charAt(0);
				idxArr.push(curIdx);
			}
			return (
				//Tell the Project instance whether it needs to add an anchor for the index
				<Project key={projectName} projectName={projectName} isNewIdx={isNewIdx} />
			)
		});
		return (
			<div>
				<p className="index">{idxArr.map(letter => (
					<a key={letter} href={'#'+letter}>{letter}</a>
				))}</p>
				<ul className="Projects">
					{projects}
				</ul>
			</div>
		);
	}
}

//Use connect to get state and dispatch
const Projects = connect(({allNames}) => ({allNames}))(ProjectsComponent);

export default Projects;

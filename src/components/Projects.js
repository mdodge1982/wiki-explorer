import React, {Component} from 'react';
import './Projects.css';
import Project from './Project';

class Projects extends Component {
	constructor(props) {
		super(props);
		props.listentoSocket();
		props.fetchProjects();
	}

	render() {
		const idxArr = [];
		let curIdx = '';
		const projects = this.props.projects.map(project => {
			let isNewIdx = false;
			if(project.charAt(0)!==curIdx){
				isNewIdx = true;
				curIdx = project.charAt(0);
				idxArr.push(curIdx);
			}
			return (
				<Project key={project} project={project} isNewIdx={isNewIdx} />
			)
		});
		return (
			<div>
			<p>Jump to:
			{idxArr.map(letter => (
				<a key={letter} href={'#'+letter}>{letter}</a>
			))}</p>
			<ul className="Projects">
				{projects}
			</ul>
			</div>
		);
	}
}

export default Projects;

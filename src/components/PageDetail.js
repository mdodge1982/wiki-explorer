import React, {Component} from 'react';
import {connect} from 'react-redux';
import {clearSelectedPage} from '../actions';
import './PageDetail.css';

class PageDetailComonent extends Component {
	render() {
		const page = this.props.page;
		if (!page.pageid) {
			return '';
		}
		const revision = page.revisions[0];
		return (
			<div className="PageDetail">
				<div className="inner">
					<button onClick={() => this.close()}>&times;</button>
					<h1>{page.title}</h1>
					<div className="flex">
						<dl>
							<dt>
								Page ID
							</dt>
							<dd>
								{page.pageid}
							</dd>
						</dl>

						<dl>
							<dt>
								Language
							</dt>
							<dd>
								{page.pagelanguage}
								({page.pagelanguagedir})
							</dd>
						</dl>

						<dl>
							<dt>
								Length
							</dt>
							<dd>
								{page.length}
							</dd>
						</dl>
					</div>
					<div className="revision">
						<h3>Last Revision</h3>
						<div className="flex">
							<dl>
								<dt>
									Revision ID
								</dt>
								<dd>
									{page.lastrevid}
								</dd>
							</dl>

							<dl>
								<dt>
									Parent ID
								</dt>
								<dd>
									{revision.parentid}
								</dd>
							</dl>

							<dl>
								<dt>
									User
								</dt>
								<dd>
									{revision.user}
								</dd>
							</dl>

							<dl>
								<dt>
									Timestamp
								</dt>
								<dd>
									{revision.timestamp}
								</dd>
							</dl>

							<dl className="comment">
								<dt>
									Comment
								</dt>
								<dd>
									{revision.comment}
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>
		);
	}
	close() {
		this.props.dispatch(clearSelectedPage());
	}
}

const PageDetail = connect(({selectedPage}) => ({page: selectedPage}))(PageDetailComonent);

export default PageDetail;

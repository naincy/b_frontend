import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * Class representing a History Tags Card Component
 */
export default class HistoryTagsCard extends Component {
	/**
 * @function render
 * render function of History Tags Card Class
 */
	render() {
		let tagsArr = this.props.tagsList;
		return (
			<div className="history-tags-cont">
				<ul className="history-tags-list">
					{tagsArr.map((i, index) => (
						<li className="history-tags-ele-cont" key={index}>
							<Link className="history-tags-element" to={`/search/${i}`} >
								{i}
							</Link>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

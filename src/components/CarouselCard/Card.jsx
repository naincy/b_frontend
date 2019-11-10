import React, { Component } from 'react';
import {OverlayTrigger,Tooltip} from "react-bootstrap";
import '../../assets/sass/card/card.css';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { ImgeUrls } from '../../variables/Variables';

/**
 * Class representing a Carousel Card component
 */
class CourseCard extends Component {
	/** @constructor
 * constructor function of Carousel Card class
 * @param {Object} props
 * global properties object
 */
	constructor(props) {
		super(props);

		this.state = {
			itemdata: props.item,
			style: '',
			crown: props.crown !== null && props.crown !== undefined ? props.crown : '' || true
		};
	}
	render() {
		//console.log("render>>>",this.state.itemdata)

		const { thumbnail, author, title, level, link, views, duration, source, type } = this.state.itemdata;
		let titletext = _.truncate(_.trim(title), { length: 50 });
		const crown = source.substring(0, 1);
		return (
			<div className="card-container" style={{ padding: '2px' }}>
				<div className="activity-item active-item">
					<div className={`icon secend-color`}>
						<a
							href={link}
							target="_blank"
						>
						<OverlayTrigger
						key='top'
						placement='top'
						overlay={
							<Tooltip id='tooltip-top'>
							<strong>{source}</strong>.
							</Tooltip>
						}
						    >
						 	<img src= {`${window.location.origin}/img/logo/${ImgeUrls[crown.toLowerCase()]}`} style={{
								width: '50px',
								position: 'absolute',
								zIndex: 2,
								top: '2px',
								left: 'calc(50% - 30px)',
								backgroundColor: 'rgb(255, 255, 255)',
								borderRadius: '30px',
						borderRadius: '45px' }} /> 
						</OverlayTrigger> 
						</a>
					</div>

					<div className="card card-stats">
						<div className="content">
							<div className="card-content-header">{titletext}</div>
							<a href={link} target="_blank" className="img-container">
							<img src={thumbnail} alt="tech-card-img" />
							<span className="owner pull-left duration">
							 {duration}
							</span>
							</a>
							<hr />
							<div className="footer">
								<div>
									<span className="course-type">{level}</span>
									<div
										className={`likes pull-right  ${this.state.style}`}
										style={{ fontSize: '23px', marginTop: '5px' }}
										onClick={(e) => {
											if (e.currentTarget.className.includes('dark-icon')) {
												this.setState({ style: '' });
											} else {
												this.setState({ style: 'dark-icon' });
											}
										}}
									>
										{
											this.state.style === 'dark-icon' ? <i className="fa fa-thumbs-up" /> : <i className="liked fa fa-thumbs-o-up" />
										}
									</div>
									<br />
									<div className="title" title={title}>
									<a href={link} target="_blank">{titletext}</a>
									</div>
									<div className="divWidth">
										<span className="owner trainer-name">
											<strong>{_.capitalize(type)} By:</strong> {author}
										</span>
										<div className="views">
											<i className="fa fa-eye" title="Views" />
											{views.toLocaleString()}
										</div>
									</div>
									{/* <div className="view-more">
										<a href={link} target="_blank">
											View Detail
										</a>
									</div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default withRouter(CourseCard);

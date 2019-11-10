import React, { Component } from 'react';
class Report extends Component {
	constructor(props) {
		super(props);
		this.state = {
			icon: props.icon,
			style: props.style || {},
			title: props.title,
			description: props.description
		};
	}

	render() {
		return (
		 
				<div className="data-point">
					<div className="dp-icon-wrapper">
						<img
							src={`${window.location.origin}/img/${this.state.icon}`}
							style={this.state.style}
							width="60"
							alt=""
						/>
					</div>
					<div className="dp-content">
						<h4>{this.state.title}</h4>
						<p style={{ width:"140px !important" }}>{this.state.description}</p>
					</div>
				</div>
			 
		);
	}
}
export default Report;

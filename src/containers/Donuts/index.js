import React, { Component } from 'react';
import Gauge from 'react-svg-gauge';
/**
 *  This Class is container for showing User growth .
 */

export default class GaugeContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 70
		};
	}

	render() {
		return (
			<div>
				<Gauge
					value={this.state.value}
					height={155}
					width={250}
					color="#1abc9c"
					backgroundColor="#edebeb"
					label=""
				/>
			</div>
		);
	}
}

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FeedbackForm from '../../components/FeedbackForm';
import { userList } from '../../service/http';

/**
 * This class contains the Feedback Form container will show to all users.
 */
class Feedback extends Component {
	/**
	 * componenet will update
	 * @param {none}
	 */
	componentWillMount() {
		userList().then((data) => {
		});
	}
	/**
	 * Render the component
	 * @param none
	 */
	render() {
		return (
			<div className="wrapper">
				<div className="main-panel notification-container" ref="mainPanel">
					<FeedbackForm />
				</div>
			</div>
		);
	}
}

export default withRouter(Feedback);

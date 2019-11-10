import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NotificationPanel from '../../components/Notification';
import { userList } from '../../service/http';

/**
 * This class contains the Notification Panel container will show only to L2 and L3 role based user.
 */
class Notification extends Component {
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
				<div id="main-panel" className="main-panel notification-container" ref="mainPanel">
					<NotificationPanel />
				</div>
			</div>
		);
	}
}

export default withRouter(Notification);

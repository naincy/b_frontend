import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import NotificationItem from '../../variables/Notification';
import { getNotifyUser, post } from '../../service/http';
import { Card } from '../Card/index';
import Button from '../CustomButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Class representing a Notification Panel Component
 */
class NotificationPanel extends Component {
	/**@constructor
 * constructor function of Notification Panel Class
 * @param {Object} props
 * global properties object
 */
	constructor(props) {
		super();
		this.state = {
			domain: [],
			title: '',
			message: '',
			image: '',
			selectdomain: ''
		};
		this.variable = {
			mode: NotificationItem.mode,
			streams: NotificationItem.domain,
			domain: []
		};
		this.changeDropdown = this.changeDropdown.bind(this);
		this.triggerNotification = this.triggerNotification.bind(this);
	}
	changeDropdown(event) {
		if (event.target.value !== '') {
			if (NotificationItem[event.target.value]) {
				this.setState({
					...this.state,
					domain: [ ...NotificationItem[event.target.value] ]
				});
			} else {
				this.setState({ ...this.state, domain: [] });
			}
		} else {
			this.setState({ ...this.state, domain: [] });
		}
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({
			[name]: value
		});
	}

	triggerNotification() {
		getNotifyUser(this.state).then((res) => {
			toast.success('Notification sent Successfully to all subscribed user !', {
				position: toast.POSITION.TOP_CENTER
			});
			post('https://donotifyme.herokuapp.com/awsnotification', res.data);
		});
	}
	/**
 * @function render
 * render function of Notifications Class
 */
	render() {
		const { title, message } = this.state;
		const modeOptions = this.variable.mode.map((obj, k) => {
			return (
				<option value={obj.id} key={k}>
					{obj.title}
				</option>
			);
		});

		const streamsOptions = this.variable.streams.map((obj, k) => {
			return (
				<option value={obj.id} key={k}>
					{obj.title}
				</option>
			);
		});

		const techOptions = this.state.domain.map((obj, k) => {
			return (
				<option value={obj.id} key={k}>
					{obj.title}
				</option>
			);
		});

		return (
			<div className="content">
				<ToastContainer autoClose={6000} />
				<Grid fluid>
					<Row>
						<Col md={6} className="form-columns">
							<Card
								title="Personalized"
								coloredTitle="Notification"
								category="(Based on Skill roll and interest)"
								content={
									<form>
										<Row>
											<Col md={12}>
												<label>Mode of Notification</label>
												<select className="form-control">
													<option>Select One</option>
													{modeOptions}
												</select>
											</Col>
										</Row>

										<Row>
											<Col md={6}>
												<label>Streams</label>
												<select
													className="form-control"
													onChange={(event) => {
														this.changeDropdown(event);
													}}
												>
													<option>Select One</option>
													{streamsOptions}
												</select>
											</Col>

											<Col md={6}>
												<label>Domain</label>
												<select
													className="form-control"
													onChange={(event) => {
														if (event.target.value !== '') {
															this.setState({
																...this.state,
																selectdomain: event.target.value
															});
														}
													}}
												>
													{techOptions}
												</select>
											</Col>
										</Row>

										<Row>
											<Col md={12}>
												<FormGroup controlId="formControlsTextarea">
													<ControlLabel>Title</ControlLabel>
													<input
														type="text"
														placeholder="Notification Title"
														className="form-control"
														name="title"
														value={title}
														onChange={this.handleChange.bind(this)}
													/>
												</FormGroup>
											</Col>
										</Row>

										<Row>
											<Col md={12}>
												<FormGroup controlId="formControlsTextarea">
													<ControlLabel>Notification Message</ControlLabel>
													<FormControl
														rows="5"
														componentClass="textarea"
														bsClass="form-control"
														placeholder="Message discription"
														defaultValue=""
														name="message"
														value={message}
														onChange={this.handleChange.bind(this)}
													/>
												</FormGroup>
											</Col>
										</Row>

										<Row>
										<Col md={12}>
											<Button
												bsStyle="success"
												pullRight
												fill
												onClick={this.triggerNotification}
												type="button"
											>
												Trigger Notification
											</Button>
										</Col>
										</Row>
										
										<div className="clearfix" />
									</form>
								}
							/>
						</Col>

						<Col md={6} className="form-columns">
						<Card
								title="Custom"
								coloredTitle="Notification"
								category=""
								content={
									<form>
										<div className="content">
											<Row>
												<Col md={12}>
													<div className="form-group">
														<label className="control-label"> Mode of Notification</label>
														<select className="form-control">
															<option>Select One</option>
															<option>Web Notification</option>
															<option>Email Notification</option>
															<option>Notification and Email</option>
														</select>
													</div>
												</Col>
											</Row>

											<Row>
												<Col md={12}>
													<FormGroup controlId="formControlsTextarea">
														<ControlLabel>Title</ControlLabel>
														<input
															type="text"
															placeholder="Notification Title"
															className="form-control"
														/>
													</FormGroup>
												</Col>
											</Row>

											<Row>
												<Col md={12}>
													<FormGroup controlId="formControlsTextarea">
														<ControlLabel>Notification Message</ControlLabel>
														<FormControl
															rows="5"
															componentClass="textarea"
															bsClass="form-control"
															placeholder="Message"
															defaultValue=""
														/>
													</FormGroup>
												</Col>
											</Row>
											<Row>
												<Col md={12}>
													<Button bsStyle="success" pullRight fill type="button">
													Trigger Notification
													</Button>
												</Col>
											</Row>
											<div className="clearfix" />
										</div>
									</form>
								} 
							/>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default NotificationPanel;

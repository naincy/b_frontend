import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import {  post } from '../../service/http';
import { Card } from '../Card/index';
import Button from '../CustomButton';
import { ToastContainer, toast } from 'react-toastify';
import {generateRandomId} from '../../utils'
import 'react-toastify/dist/ReactToastify.css';

/**
 * Class representing a Feedback Form Component
 */
class FeedbackForm extends Component {

/**@constructor
 * constructor function of Notification Panel Class
 * @param {Object} props
 * global properties object
 */
	constructor(props) {
		super();
		this.state = {
			name: '',
			desc: '',
			rating: 0,
		};
	}


	handleNameChange(event) {
		const value = event.target.value;
		this.setState({
			name: value,
		});
	}
	handleDescChange(event) {
		const value = event.target.value;
		this.setState({
			desc: value,
		});
	}
	submitForm(event){
		event.preventDefault();
		const self = this;
		const url = 'http://10.150.122.218:8000/app/api/v1/feedback';
		const username = this.state.name.trim() || 'Anonymous';
		const comment = this.state.desc.trim();
		const rating = this.state.rating;
		const formData = {
			feedback:{
				id: generateRandomId(),
				username,
				comment,
				rating: this.state.rating
			}
		};
		rating && comment && post(url,formData).then((res) => {
			if (res.response.data.ResponseMetadata.HTTPStatusCode !== 200) {
				toast.error('Something Went Wrong', {
					position: toast.POSITION.TOP_CENTER
				});
			} else {
				toast.success('Thank you for your valuable feeback !', {
					position: toast.POSITION.TOP_CENTER
				});
				self.setState({
					name: '',
					desc: '',
					rating: 0,
				});
			}
		});;
	}

	submitRating(rating) {
		this.setState({
			rating
		})
	}

	/**
 * @function render
 * render function of Notifications Class
 */
	render() {
		const { name, desc } = this.state;
	
		return (
			<div className="content feedback-wrapper">
				<ToastContainer autoClose={6000} />
				<Grid fluid>
					<Row>

						<Col md={8} mdOffset="2" className="form-columns">
						<Card
								title="Feedback"
								coloredTitle="Form"
								category=""
								content={
									<form>
										<div className="content">
											<Row >
												<Col md={12} >
													<div className="form-group">
													<FormGroup controlId="formControlsTextarea">
													<ControlLabel>Your Name</ControlLabel>
													<input
														type="text"
														placeholder="Enter your name (optional)"
														className="form-control"
														name="visitorName"
														value={name}
														onChange={this.handleNameChange.bind(this)}
													/>
												</FormGroup>
											
													<FormGroup controlId="formControlsTextarea">
														<ControlLabel>Your Feedback</ControlLabel>
														<FormControl
															rows="5"
															componentClass="textarea"
															bsClass="form-control"
															placeholder="Enter Feedback"
															defaultValue=""
															value={desc}
															onChange={this.handleDescChange.bind(this)}

														/>
													</FormGroup>
													<Row className="no-margin-mob star-group no-padding-mob">
													<Col md={12} style={{paddingTop: "10px"}} className="no-padding-mob">
														<label className="rating-label">Rate Us: </label>
														{
															[...Array(5)].map((e, i) => (<div className="stars" onClick={() => this.submitRating(i + 1)}>{i < this.state.rating ? <i key={i} className="fa fa-star golden" /> : <i key={i} className="fa fa-star" />}</div>))
														}
													</Col>
												</Row>
													<Button
														bsStyle="success"
														pullRight
														fill
														disabled={this.state.desc.trim() && this.state.rating ? false : true}
														onClick={this.submitForm.bind(this)}
														type="submit"
													>
														Submit Form
													</Button>
													</div>
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

export default FeedbackForm;

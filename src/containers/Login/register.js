import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../service/http';

import '../../assets/sass/login/login.css';
import logoBig from '../../assets/img/logo-big.png';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames';

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	error: ''
};

/**
 * This class contains logic of Register functionlaity.
 * 1) SearchResults componenmt
 * 2) HistoryTagsCard componenmt
 */

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialState
		};
	}

	validateForm() {
		const { firstName, lastName, email, password } = this.state;
		 
		const isInvalid = !firstName || !lastName || !email || !password || password.length <= 7;
		return isInvalid;
	}

	handleSubmit(event) {
		event.preventDefault();
		const name = this.state.firstName + ' ' + this.state.lastName;
		const { email, password } = this.state;
		registerUser({ email, name, password }).then((res) => {
			if (res.data.response.message) {
				toast.error(`${res.data.response.message}`, {
					position: toast.POSITION.TOP_CENTER
				});
			} else {
				toast.success('You have Successfully Registered !', {
					position: toast.POSITION.TOP_CENTER
				});
				 // this.props.history.push('/signin');
				 this.setState({
					firstName: '',
					lastName: '',
					email: '',
					password: '',
				});
			}
		});
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({
			[name]: value
		});
	}

	clearState() {
		this.setState({ ...initialState });
	}

	render() {
		const { firstName, lastName, email, password } = this.state;

		return (
			<Fragment>
				<ToastContainer autoClose={6000} />
				<div className="wrapper public-wrapper auth-container">
					<div className="main-panel dark">
						<div className="content dark">
							<Fragment>
								<div className="registerpage">
									<section className="login-block">
										<div className="auth-logo-wrapper">
											<img src={logoBig} alt="" className="auth-logo"/>
										</div>
										<div className="auth-wrapper">
											<div className="">
												<div className="form">
												 	<ul className="tab-group">
														<li className="tab ">
															<Link to="/signin">Log In</Link>
														</li>
														<li className="tab active">
															<Link to="/signup">Sign Up</Link>
														</li>
													</ul>
												 
													<form onSubmit={(event) => this.handleSubmit(event)}>
														<div id="signup">
														<h2 className="text-center">Sign up now</h2>
															<div
																className={classNames({
																	'error-label': this.state.error !== ''
																})}
															>
																{this.state.error}
															</div>

															<div className="top-row">
																<div className="field-wrap">
																	<input
																		placeholder="First Name"
																		type="text"
																		name="firstName"
																		required
																		value={firstName}
																		onChange={this.handleChange.bind(this)}
																		autoComplete="off"
																	/>
																</div>

																<div className="field-wrap">
																	<input
																		type="text"
																		placeholder="Last Name"
																		required
																		name="lastName"
																		value={lastName}
																		onChange={this.handleChange.bind(this)}
																		autoComplete="off"
																	/>
																</div>
															</div>

															<div className="field-wrap">
																<input
																	type="email"
																	placeholder="Email Address"
																	required
																	name="email"
																	value={email}
																	onChange={this.handleChange.bind(this)}
																	autoComplete="off"
																/>
															</div>

															<div className="field-wrap">
																<input
																	type="password"
																	placeholder="Set A Password"
																	required
																	name="password"
																	value={password}
																	onChange={this.handleChange.bind(this)}
																	autoComplete="off"
																/>
															</div>

															<button
																type="submit"
																className="button button-block"
																disabled={this.validateForm()}
															>
																Create Account
															</button>
														</div>
													</form>
													<p className="disclaimer-text">Have already an account ? <Link to="/signin"><strong>Login Here</strong></Link></p>
												</div>
											</div>
										</div>
									</section>
								</div>
							</Fragment>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Register;

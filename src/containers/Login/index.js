import React, { Component, Fragment } from 'react';
import cookie from 'react-cookies';
import { Link, withRouter } from 'react-router-dom';
import { authenticateUser } from '../../service/http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/sass/login/login.css';
import logoBig from '../../assets/img/logo-big.png';

const initialState = {
	email: '',
	password: ''
};

/**
 * This class contains logic of login functionlaity.
 * 1) SearchResults componenmt
 * 2) HistoryTagsCard componenmt
 */

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialState
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	/**
	 * validateForm is used to validate the email and password length
	*/
	validateForm() {
		const { email, password } = this.state;
		const isInvalid = !email || !password || password.length <= 7;
		return isInvalid;
	}

	/**
	 * 
	 * @param {*} event 
	 */
	handleSubmit(event) {
		event.preventDefault();
		authenticateUser(this.state).then((res) => {
			if (res.data.response.message) {
				toast.error(`${res.data.response.message}`, {
					position: toast.POSITION.TOP_CENTER
				});
			} else {
				cookie.save('accesstoken', res.headers.jwt, { path: '/', domain: '' });
				cookie.save('name', res.data.response.data.name, { path: '/', domain: '' });
				localStorage.setItem('userdetails', JSON.stringify(res.data.response));

				this.props.changeState(true);
				this.props.history.push('/');
			}
		});
	}
/**
 * 
 * @param {*} event 
 */
	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({
			[name]: value
		});
	}
	/**
	 * Clear the state
	 * @param none
	 */
	clearState() {
		this.setState({ ...initialState });
	}

	/**
	 * Render the component
	 * @param none
	 */
	render() {
		const { password, email } = this.state;
		return (
			<Fragment>
				<ToastContainer autoClose={6000} />
				<div className="wrapper public-wrapper auth-container">
					<div className="main-panel dark">
						<div className="content dark">
							<div className="registerpage">
								<section className="login-block">
									<div className="auth-logo-wrapper">
										<img src={logoBig} alt="" className="auth-logo" />
									</div>
									<div className="auth-wrapper">
										<div className="">
											<div className="form">
												<ul className="tab-group">
													<li className="tab active">
														<Link to="/signin">Log In</Link>
													</li>
													<li className="tab ">
														<Link to="/signup">Sign Up</Link>
													</li>
												</ul>
												<form onSubmit={(event) => this.handleSubmit(event)}>
													<div className="tab-content">
														<div id="login">
															<h2 className="text-center">Login to your account!</h2>

															<div className="top-row">
																<div className="field-wrap">
																	<input
																		type="email"
																		placeholder="Email Address"
																		required
																		name="email"
																		value={email}
																		onChange={this.handleChange.bind(this)}
																	/>
																</div>

																<div className="field-wrap">
																	<input
																		type="password"
																		placeholder="Password"
																		name="password"
																		value={password}
																		onChange={this.handleChange.bind(this)}
																		required
																		autoComplete="off"
																	/>
																</div>
															</div>

															<p className="forgot">
																<Link to="#">Forgot Password?</Link>
															</p>

															<button type="submit" className="button button-block">
																Log In
															</button>
														</div>
													</div>
												</form>

												<p className="disclaimer-text">
													{' '}
													Don't have an Account ?
													<Link to="/signup">
														<strong> Signup Now</strong>
													</Link>
												</p>
											</div>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withRouter(Login);

import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { getRecommendations, getHistoryRecommendations, getInterestRecommendations } from '../../service/http';
import CarouselCardComponent from '../../components/CarouselCard';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import CourseCard from './trending';
import GaugeContainer from '../Donuts';
import '../../assets/sass//user/index.css';

/**
 *  This Class is container for User Dashboard, 
 *  Consist of invoking multiple in components
 *  such as  History based,Interest based and Skill based Recommendatation
 */

class UserDashboard extends Component {
	/**
	 * constructor
	 * @param {none}
	 */
	constructor(props) {
		super(props);

		this.state = {
			userDetail: JSON.parse(localStorage.getItem('userdetails')),
			Recommended: [],
			History: [],
			Interest: [],
			messageShow: 'dn',

			loadingSkill: true,
			loadingInterest: true,
			loadingHistory: true,

			trending: {
				one: {
					images: [ '1.jpg', '2.png', '3.jpg', '4.gif', '5.png', '7.jpg' ],
					folder: '300'
				},
				two: {
					images: [ '8.jpg', '9.jpg', '9.png', '10.png', '44.jpg', '7.jpg' ],
					folder: '300'
				},
				third: {
					images: [ '2.png', '4.png', '15.png', '16.png', '19.png', '1.png' ],
					folder: '522'
				}
			}
		};
	}
	/**
	 * Validate if user data is present
	 * @param {none}
	 */
	checkuserDatapresent() {
		if (this.state.userDetail && this.state.userDetail.hasOwnProperty('data')) {
			let userdata = this.state.userDetail.data;
			if (userdata.hasOwnProperty('isUserDataPresent')) {
				if (!userdata.isUserDataPresent) {
					this.setState({
						messageShow: 'db'
					});
				}
			}
		}
	}
	/**
	 * Close the message
	 * @param {none}
	 */
	closeMessage() {
		this.setState({
			messageShow: 'dn'
		});

		const userstate = JSON.parse(localStorage.getItem('userdetails'));
		userstate.data.isUserDataPresent = true;
		window.localStorage.setItem('userdetails', JSON.stringify(userstate));
	}

	/**
	 * Life cycle component did mount
	 * @param {none}
	 */
	componentDidMount() {
		this.checkuserDatapresent();
	}

	/**
	 * Life Cycle function trigger just after initilaization
	 * @param {none}
	 */
	componentWillMount() {
		const email = this.state.userDetail!== null ? this.state.userDetail.data.email:'';
		if (email) {
			getRecommendations(email).then((res) => {
				if (res !== undefined) {
					this.setState({
						...this.state,
						loadingSkill: false,
						Recommended: res.data && res.data.courses ? [ ...res.data.courses ] : []
					});
				}
			});
			/**
			 * Get the recommendation for user history
			 * @param {string} email
			 */
			getHistoryRecommendations(email).then((res) => {
				if (res != undefined) {
					this.setState({
						...this.state,
						loadingHistory: false,
						History: res.data && res.data.courses ? [ ...res.data.courses ] : []
					});
				}
			});
			/**
			 * Get the recommendation for user interests
			 * @param {string} email
			 */
			getInterestRecommendations(email).then((res) => {
				if (res != undefined) {
					this.setState({
						...this.state,
						loadingInterest: false,
						Interest: res.data && res.data.courses ? [ ...res.data.courses ] : []
					});
				}
			});
		}
	}
	/**
	 * Render the component
	 * @param none
	 */
	render() {
		return (
			<div className="wrapper">
				<Grid fluid className={`message-data ${this.state.messageShow}`}>
					<Row className="centered">
						<Col md={12}>
							<Row>
								<Col md={6} className="centered">
									<div className="alert alert-info text-center">
										<br />
										<h4>
											<span className="glyphicon glyphicon-hand-right" /> &nbsp;<b>To get Personalized Courses, Please update your Interests and Skills</b>
										</h4>
										<br />
										<Link to={'/user'} className="btn-fill btn btn-success">
											Update Skill
										</Link>
										&nbsp;
										<button
											onClick={() => {
												this.closeMessage();
											}}
											className="btn-fill btn btn-default"
											style={{marginLeft: "10px"}}
										>
											Close
										</button>
									</div>
								</Col>
							</Row>
						</Col>
					</Row>
				</Grid>
				<div id="main-panel" className="main-panel userpanel">
					<section className="admin-dashboard-container ">
						<Grid fluid className="skill-warpper">
							<Row>
								<Col md={12} sm={12}>
									<div className="module posts-carousel-module">
										<div className="module-head">
											<h1>
												Most Relevant Courses Based on Your <span>Skills</span>
											</h1>
										</div>
										<Col md={12} className="">
											{(() => {
												if (!this.state.loadingSkill) {
													return (
														<CarouselCardComponent count={5} courses={this.state.Recommended} />
													);
												} else {
													return <Loader />;
												}
											})()}
										</Col>
									</div>
								</Col>
							</Row>
						</Grid>

						{(() => {
							if (
								this.state.Interest.length > 0 &&
								this.state.userDetail.data.profile.interests.length > 0
							) {
								return (
									<Grid fluid className="bottom-warpper">
										<Row>
											<Col md={9} sm={12}>
												<div className="module posts-carousel-module ">
													<div className="module-head">
														<h2>
															Courses of Your <span>Interest</span>
														</h2>
													</div>
													<Col md={12}>
														{(() => {
															if (!this.state.loadingInterest) {
																return (
																	<CarouselCardComponent
																		count={4}
																		courses={this.state.Interest}
																	/>
																);
															} else {
																return <Loader />;
															}
														})()}
													</Col>
												</div>
											</Col>
											<Col md={3} sm={12}>
												<div className="module posts-carousel-module high-rate-tech">
													<div className="module-head">
														<h2>
															Learning Completion <span>Status</span>
														</h2>
													</div>
													<Col md={12}>
														<GaugeContainer />
													</Col>
												</div>
											</Col>

											<Col md={3} sm={12}>
												<div className="module posts-carousel-module high-rate-tech">
													<div className="module-head">
														<h2>
															Highly Rated <span>Courses</span>
														</h2>
													</div>
													<Col md={12}>
														<CourseCard
															cards={this.state.trending.third.images}
															folder={this.state.trending.third.folder}
															count={1}
															autoPlay
															duration={3000}
															navigation={false}
															dotsDisabled={false}
														/>
													</Col>
												</div>
											</Col>
										</Row>
									</Grid>
								);
							}
						})()}

						{(() => {
							if (
								this.state.History.length > 0 &&
								this.state.userDetail.data.profile.searchHistory.length > 0
							) {
								return (
									<Grid fluid>
										<Row>
											<Col md={12} sm={12}>
												<div className="module posts-carousel-module bottom-warpper  mt-0">
													<div className="module-head">
														<h2>
															Recently Viewed <span>Courses</span>{' '}
														</h2>
													</div>
													<Col md={12}>
														{(() => {
															if (!this.state.loadingHistory) {
																return (
																	<CarouselCardComponent
																		count={5}
																		courses={this.state.History}
																	/>
																);
															} else {
																return <Loader />;
															}
														})()}
													</Col>
												</div>
											</Col>
										</Row>
									</Grid>
								);
							}
						})()}
						<Grid fluid>
							<Row>
								<Col md={6} sm={12}>
									<div className="module posts-carousel-module bottom-warpper  mt-0">
										<div className="module-head">
											<h2>
												Currently <span>Trending</span>
											</h2>
										</div>
										<Col md={12}>
											<CourseCard
												cards={this.state.trending.one.images}
												folder={this.state.trending.one.folder}
												count={2}
												autoPlay
												duration={3000}
												navigation={false}
												dotsDisabled={false}
											/>
										</Col>
									</div>
								</Col>
								<Col md={6}>
									<div className="module posts-carousel-module bottom-warpper  mt-0">
										<div className="module-head">
											<h2>
												Mandatory <span>Courses</span>{' '}
											</h2>
										</div>
										<Col md={12}>
											<CourseCard
												cards={this.state.trending.two.images}
												folder={this.state.trending.two.folder}
												dotsDisabled={false}
												navigation={false}
												count={2}
											/>
										</Col>
									</div>
								</Col>
							</Row>
						</Grid>
					</section>
				</div>
			</div>
		);
	}
}

export default UserDashboard;

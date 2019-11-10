import React, { Component, Fragment } from 'react';

import UserDashboard from '../User';
import LogoCard from '../../components/LogoCard';
import { Grid, Row, Col } from 'react-bootstrap';
import { adminCards } from '../../variables/Variables';
import { saveUserData } from '../../service/http';
import CourseCard from '../User/trending';
import Report from '../../components/Report/report';
import '../../assets/sass/dashboard/report.css';

/**
 *  This Class is container for Admin Dashboard, 
 *  Consist of invoking multiple in components
 * */

class Dashboard extends Component {
	/**
	 * Constructor
	 * @param {none}
	 */
	constructor(props) {
		super(props);
		this.state = {
			userDetail: JSON.parse(localStorage.getItem('userdetails')),
			trending: {
				third: {
					images: [ '2.png', '4.png', '15.png', '16.png', '19.png', '1.png' ],
					folder: '522'
				},
				two: {
					images: [ '1.png', '2.png', '3.png', '4.png', '5.png' ],
					folder: 'management'
				}
			}
		};
	}
	/**
	 * componenet did update
	 * @param {none}
	 */
	componentWillMount() {
		const userDetail = JSON.parse(localStorage.getItem('userdetails'));

		if (userDetail !== null && userDetail.data !== null) {
			if (userDetail.data.profile.devices.length >= 0) {
				if (!userDetail.data.profile.devices.includes(localStorage.getItem('deviceToken'))) {
					userDetail.data.profile.devices.push(localStorage.getItem('deviceToken'));
				}
				this.updateServiceCall(localStorage.getItem('deviceToken'), userDetail.data.email);
				localStorage.setItem('userdetails', JSON.stringify(userDetail));
			}
		}
	}
	/**
	 * componenet did update
	 * @param {event}
	 */
	componentDidUpdate(e) {
		if (
			window.innerWidth < 993 &&
			e.history && e.history.location && e.location &&
			e.history.location.pathname !== e.location.pathname &&
			document.documentElement.className.indexOf('nav-open') !== -1
		) {
			document.documentElement.classList.toggle('nav-open');
		}
	}
	/**
	 * To update the user data
	 * @param {string} device
	 * @param {string} email
	 */
	updateServiceCall(device, email) {
		saveUserData({
			user: {
				email,
				device
			}
		});
	}

	/**
	 * Render the component
	 * @param none
	 */
	render() {
		return (
			<div className="wrapper">
				{this.state.userDetail!== null && this.state.userDetail.data.profile.role === 'L3' ? (
					<Fragment>
						<Grid fluid>
							<Row>
								<Col md={12}>
									<div className="data-point-wrapper row">
										<Col md={3}>
											<Report
												title={'59%'}
												icon={'growth.png'}
												description={'Employee Learning Plan Completion Status'}
											/>
										</Col>

										<Col md={3}>
											<Report
												title={'38'}
												icon={'batch.png'}
												description={'Classroom Trainings Completed'}
											/>
										</Col>
										<Col md={3}>
											<Report
												title={'15'}
												icon={'share.png'}
												description={'Ongoing Online Courses'}
											/>
										</Col>
										<Col md={3}>
											<Report
												title={'6'}
												icon={'classroom.png'}
												description={'Ongoing Classroom Trainings'}
												style={{ margin: '10px' }}
											/>
										</Col>
									</div>
								</Col>
							</Row>
							<Row>
								<Col md={7} lg={7}>
									<section className="admin-dashboard-container platform-wrapper">
										<article className="admin-dashboard-header">Learning <span> Platforms</span> </article>
										<article className="admin-dashboard-wrapper">
											{adminCards.map((card, index) => <LogoCard {...card} key={index} />)}
										</article>
										<Row>
											<span>
												<button
													style={{ margin: '8px 29px' }}
													type="submit"
													className="btn-fill pull-right btn btn-success"
												>
													Add Platform
												</button>
											</span>
										</Row>
									</section>
								</Col>
								<Col md={5} lg={5}>
									<section className="admin-dashboard-container recommendation-wrapper">
										<article className="admin-dashboard-header" style={{ fontSize: '21px' }}>
											Request for <span> Classroom Trainings</span> 
										</article>

										<CourseCard
											cards={this.state.trending.third.images}
											folder={this.state.trending.third.folder}
											count={2}
											navigation={false}
											dotsDisabled={false}
										/>

										<article className="admin-dashboard-header" style={{ fontSize: '21px' }}>
											Currently <span>Trending</span>
										</article>
										<CourseCard
											cards={this.state.trending.two.images}
											folder={this.state.trending.two.folder}
											count={2}
											autoPlay
											duration={3000}
											navigation={false}
											dotsDisabled={false}
										/>
									</section>
								</Col>
							</Row>
						</Grid>
					</Fragment>
				) : (
					<Fragment>
						<UserDashboard />
					</Fragment>
				)}
			</div>
		);
	}
}

export default Dashboard;

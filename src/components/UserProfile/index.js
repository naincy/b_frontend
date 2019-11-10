import React, { Component } from 'react';
import { Grid, Row, Col, ProgressBar} from 'react-bootstrap';

import { Card } from '../Card';
import { UserCard } from '../UserCard';
import Button from '../CustomButton';
import defaultImage from '../../assets/img/faces/face-0.jpg';
import AddTags from '../../components/AddTag';
import { saveUserData } from '../../service/http';

/**
 * Class representing a User Profile Component
 */
class UserProfile extends Component {
	/**@constructor
 * constructor function of User Profile Class
 * @param {Object} props
 * global properties object
 */
	constructor(props) {
		super(props);
		let userInfo = JSON.parse(localStorage.getItem('userdetails'));
		let name = userInfo.data.name.split(' ');
		let userImage = userInfo.data.profile.image ? userInfo.data.profile.image : defaultImage;
		let userSkills = []; 
		userInfo.data.profile.skills && userInfo.data.profile.skills.forEach(element => {
			userSkills.push(element.name)
		})

		this.state = {
			name: userInfo.data.name,
			firstName: name[0],
			lastName: name[1],
			email: userInfo.data.email,
			interests: userInfo.data.profile.interests,
			skills: userSkills,
			skillsData: userInfo.data.profile.skills && userInfo.data.profile.skills,
			avatar: userImage,
			designation: userInfo.data.profile.designation,
			projects: userInfo.data.profile.projects,
			rating: 0
		};

		this.saveSkillHandler = this.saveSkillHandler.bind(this);
		this.onClickInterestHandler = this.onClickInterestHandler.bind(this);
		this.updateSkillLevel = this.updateSkillLevel.bind(this);
	}

	saveSkillHandler(newSkill) {
		let skillSet = this.state.skillsData;
		if (newSkill.length > this.state.skillsData.length) {
			let skill = newSkill.pop();
			let data ={'name': skill, 'level': 1};
			skillSet = this.state.skillsData;
			skillSet.push(data);
		} else {
			let test = [];
			skillSet.forEach((skill) => {
				if (!(newSkill.indexOf(skill.name) == -1)) {
					test.push(skill)
				}
			})
			skillSet = test;
		}
		this.setState({ skillsData: skillSet });

		saveUserData({
			user: {
				email: this.state.email,
				skills: skillSet
			}
		}).then((res) => {
			this.updatestorage(res);
		});
	}

	onClickInterestHandler() {
		saveUserData({
			user: {
				email: this.state.email,
				interests: this.state.interests
			}
		}).then((res) => {
			this.updatestorage(res);
		});
	}

	updatestorage(res) {
		window.localStorage.setItem('userdetails', JSON.stringify(res.data.response));
	}

	renderProjectData() {
		let html = [];
		this.state.projects.forEach((proj, index) => {
			html.push(<Row key={index}><Col md={12}>
			<h6>{proj.name} ({proj.start} to {proj.end == null ? 'On Going' : proj.end})</h6></Col>
			</Row>)
		})
		return html;
	}

	updateSkillLevel(selSkill, level) {
		let skillSet = this.state.skillsData;
		let test = [];
		skillSet.forEach((skill) => {
			if (selSkill == skill.name) {
				skill.level = level;
			}
			test.push(skill);
		})
		skillSet = test;
		this.setState({ skillsData: skillSet });

		saveUserData({
			user: {
				email: this.state.email,
				skills: skillSet
			}
		}).then((res) => {
			this.updatestorage(res);
		});
	}

	renderSkillsCompetancy() {
		let html = [];
		let _self = this;
		this.state.skillsData.forEach((skill, index) => {
			html.push(<Row key={index}>
			<Col sm={4} xs={12}><h6 className="star-text">{skill.name}</h6></Col>
			<Col sm={4} xs={6} className="text-right no-padding-right"><span className="skill-star">
			{
            	[...Array(3)].map((e, i) => (<div className="stars" onClick={() => _self.updateSkillLevel(skill.name, i+1)}>{i < skill.level ? <i key={i} className="fa fa-star golden" /> : <i key={i} className="fa fa-star" />}</div>))
          	}
				</span>
			</Col>
			<Col sm={4} xs={6}>
				<div className={`level-tag l${skill.level}`}>
				{
					(skill.level == 1 ? 'Beginner' : (skill.level == 2 ? 'Intermediate' : 'Advanced') )
				}
				</div>
			</Col>
			</Row>)
		})
		return html;
	}

	/**
 * @function render
 * render function of User Profile Class
 */
	render() {
		return (
			<div className="wrapper">
			<div className="main-panel">
				<div className="content paddingt20">
				<Grid fluid>
					<Row>
						<Col md={9}>
							<Card
								title="Edit"
								coloredTitle="Profile"
								category=""
								content={
									<form>
										<Row className="no-margin-mob">
											<Col md={6}>
												<label>Company Name</label>
												<input
													type="text"
													className="form-control"
													name="title"
													value="Publicis Sapient"
													disabled="disabled"
												/>
											</Col>
											<Col md={6}>
												<label>Email</label>
												<input
													type="text"
													className="form-control"
													name="title"
													value={this.state.email}
													disabled="disabled"
												/>
											</Col>
										</Row>

										<Row className="no-margin-mob">
											<Col md={6}>
												<label>First Name</label>
												<input
													type="text"
													className="form-control"
													name="title"
													placeholder="First Name"
													value={this.state.firstName}
												/>
											</Col>

											<Col md={6}>
												<label>Last Name</label>
												<input
													type="text"
													className="form-control"
													name="title"
													placeholder="Last Name"
													value={this.state.lastName}
												/>
											</Col>
										</Row>
										<Row className="no-margin-mob">
											<Col md={12} className="update-profile-btn">
												<Button bsStyle="success" pullRight fill type="submit">
													Update
												</Button>
											</Col>
										</Row>
										<div className="clearfix" />
									</form>
								}
							/>
							<Row>
								<Col md={6}>
									<Card
										title="Subscribed"
										coloredTitle="Devices"
										category=""
										content={
											<Row>
												<Col md={6}>
													<ul className="subscribed-list">
														<li>
															<div className="list-content">
																<div className="list-icon">
																	<i className="pe-7s-airplay" />
																</div>
																<div className="list-text">Windows 10</div>
															</div>
															<div className="list-content">
																<div className="list-icon">
																	<i className="pe-7s-airplay" />
																</div>
																<div className="list-text">Mac OS 10.13.6</div>
															</div>
															<div className="list-content">
																<div className="list-icon">
																	<i className="pe-7s-airplay" />
																</div>
																<div className="list-text">Ubuntu Chromium</div>
															</div>
														</li>
													</ul>
												</Col>
											</Row>
										}
									/>
								</Col>
								<Col md={6}>
									<Card
											title="Skills"
											category=""
											content={
											<div className="content">
												<div className="row no-margin-mob">
													<div className="col-md-12">
														<div className="history-tags-cont">
															<AddTags
																tags={this.state.skills}
																placeholder={'Add Skill'}
																onChangeTag={(data) => {
																	this.setState({ skills: [ ...data ] },()=>{
																		this.saveSkillHandler(data)
																	});
																}}
															/>
														</div>
													</div>
												</div>

												<Row className="no-margin-mob">
													<Col md={12} style={{paddingTop: "10px"}}>
													{(!this.state.skillsData ? '' :
														this.renderSkillsCompetancy()
													) }
													</Col>
												</Row>
											</div>
										}
									/>

									<Card
										title="Interest"
										category=""
										content={
											<div className="content">
												<div className="row no-margin-mob">
													<div className="col-md-12">
														<div className="history-tags-cont">
															<AddTags
																placeholder={'Add Interest'}
																tags={this.state.interests}
																onChangeTag={(data) => {
																	this.setState({ interests: [ ...data ] },()=>{
																		this.onClickInterestHandler()
																	});
																}}
															/>
														</div>
													</div>
												</div>
											</div>
										}
									/>
								</Col>
							</Row>
						</Col>
						<Col md={3}>
							<UserCard
								bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
								avatar={this.state.avatar}
								name={this.state.name}
								userName={this.state.email}
								description={this.state.designation ? this.state.designation: 'IT Professional'}
								socials={
									<div>
										<Button simple>
											<i className="fa fa-facebook-square" />
										</Button>
										<Button simple>
											<i className="fa fa-twitter" />
										</Button>
										<Button simple>
											<i className="fa fa-google-plus-square" />
										</Button>
									</div>
								}
							/>
							<Card
								title="Classroom Training"
								coloredTitle="Tracker"
								content= {
									<div className="course-tracker">
										<Row className="no-margin-mob">
											<Col md={6}>
												<p className="courseTracker">React Basics</p>
											</Col>
											<Col md={6}><ProgressBar className="success" now={60} /></Col>
										</Row>
										<Row className="no-margin-mob">
											<Col md={6}><p className="courseTracker">Redux & Saga</p></Col>
											<Col md={6}><ProgressBar now={84} /></Col>
										</Row>
										<Row className="no-margin-mob">
											<Col md={6}><p className="courseTracker">Node JS</p></Col>
											<Col md={6}><ProgressBar now={74} /></Col>
										</Row>
										<Row className="no-margin-mob">
											<Col md={6}><p className="courseTracker">Python</p></Col>
											<Col md={6}><ProgressBar now={10} /></Col>
										</Row>
										<Row className="no-margin-mob">
											<Col md={6}><p className="courseTracker">Agile and Scrum Training</p></Col>
											<Col md={6}><ProgressBar now={25} /></Col>
										</Row>
									</div>
								}
							/>
						</Col>
					</Row>
				</Grid>
			</div>
			</div>
			</div>
		);
	}
}

export default UserProfile;

import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import { TechCard } from 'components/TechCard';
import { UserCard } from 'components/UserCard';
import Button from '../CustomButton';
import avatar from '../../assets/img/faces/face-0.jpg';
 
// mock data
const stackJsonArr = [
	{
		header: 'Trending Courses',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
	},
	{
		header: 'Recommended Trainings',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
	},
	{
		header: 'Might Be Interested On',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
	}
];
const userDetails = {
	name: 'Anshul Kabra',
	userName: 'ans990',
	description: [ 'Frontend Expert', 'Technology Enthusiast', 'Rockstar' ],
	social: {
		facebook: '',
		twitter: '',
		linkedin: '',
		github: ''
	}
};

let intervalFun;


/**
 * Class representing a Dashboard Component
 */
class Dashboard extends Component {
	state = {
		expandedStack: null,
		totalStacks: 2
	};
/**
 * @function componentDidMount
 * component component DidMount life cycle function of Dashboard class
 */
	componentDidMount() {
		setTimeout(() => {
			this.setState({
				expandedStack: 0
			});
			this.startAnimation();
		}, 1000);
	}

	createLegend(json) {
		var legend = [];
		for (var i = 0; i < json['names'].length; i++) {
			var type = 'fa fa-circle text-' + json['types'][i];
			legend.push(<i className={type} key={i} />);
			legend.push(' ');
			legend.push(json['names'][i]);
		}
		return legend;
	}

	startAnimation() {
		const self = this;
		intervalFun = setInterval(function() {
			  self.state.expandedStack < self.state.totalStacks
					? self.setState({
							expandedStack: self.state.expandedStack + 1
						})
					: self.setState({
							expandedStack: 0
						});
		}, 5000);
	}

	onMoseOverStack(key) {
		clearInterval(intervalFun);
		this.setState({
			expandedStack: key
		});
	}

	onMoseOutStack() {
		this.startAnimation();
	}
/**
 * @function render
 * render function of Dashboard Class
 */
	render() {
		const userDetail = this.props.userDetail;
		let email = '',
			name = '',
			image = '';
		if (userDetail !== null && userDetail.data !== null) {
			email = userDetail.data.email;
			name = userDetail.data.name;
			if (userDetail.data.profile.image) {
				image = userDetail.data.profile.image;
			}
    }
    
    
    console.log(image)
		return (
    
			<div className="dashboard-container">
				<div className="content">
					<Grid fluid>
						<Row>
							<Col>
								<UserCard
									bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
									avatar={image !== null && image !=='' ? image : avatar}
									name={name}
									userName={email}
									description={
										<span>
											{userDetails.description.map((d, i) => {
												return i === userDetails.description.length - 1 ? (
													<span key={i}>{d}</span>
												) : (
													<span key={i}>
														{' '}
														{d}
														<br />
													</span>
												);
											})}
										</span>
									}
									socials={
										<div>
											<Button simple>
												<i className="fa fa-facebook-square" />
											</Button>
											<Button simple>
												<i className="fa fa-twitter" />
											</Button>
											<Button simple>
												<i className="fa fa-linkedin-square" />
											</Button>
											<Button simple>
												<i className="fa fa-google-plus-square" />
											</Button>
										</div>
									}
								/>
							</Col>
						</Row>
					</Grid>
				</div>
				<div className="stack-wrapper">
					<section className="stack">
						{stackJsonArr ? (
							stackJsonArr.map((item, key) => (
								<article
									key={key}
									className={this.state.expandedStack === key ? 'stack-item expanded' : 'stack-item'}
									onMouseOver={() => this.onMoseOverStack(key)}
									onMouseOut={this.onMoseOutStack.bind(this)}
								>
									<div className="dot-icon">
										<i className="fa fa-circle" />
									</div>
									<div className="stack-content">
										<div className="stack-header">
											{item.header} <span className="stack-link">See All</span>
										</div>
										<div className="stack-description">
											<Row>
												<Col lg={3} sm={6}>
													<TechCard
														imagePath="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
														statsText="test"
														statsValue="105GB"
														statsIcon={<i className="fa fa-refresh" />}
														title="Learning Excel"
														owner="Naincy gupta"
													/>
												</Col>
												<Col lg={3} sm={6}>
													<TechCard
														imagePath="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
														statsText="test"
														statsValue="105GB"
														statsIcon={<i className="fa fa-refresh" />}
														title="Learning Excel"
														owner="Naincy gupta"
													/>
												</Col>
												<Col lg={3} sm={6}>
													<TechCard
														imagePath="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
														statsText="test"
														statsValue="105GB"
														statsIcon={<i className="fa fa-refresh" />}
														title="Learning Excel"
														owner="Naincy gupta"
													/>
												</Col>
												<Col lg={3} sm={6}>
													<TechCard
														imagePath="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
														statsText="test"
														statsValue="105GB"
														statsIcon={<i className="fa fa-refresh" />}
														title="Learning Excel"
														owner="Naincy gupta"
													/>
												</Col>
											</Row>
										</div>
									</div>
								</article>
							))
						) : (
							''
						)}
					</section>
				</div>
			</div>
		);
	}
}

export default Dashboard;

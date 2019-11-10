// eslint-disable-next-line
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import cookie from 'react-cookies';
import ReactGA from 'react-ga';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/animate.min.css';

import './assets/sass/main.css?v=1.2.0';

import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';
import Dashboard from './containers/Dashboard';
import SearchPage from './containers/SearchPage';
import UserProfile from './components/UserProfile';
import Login from './containers/Login';
import Register from './containers/Login/register';
import AboutUs from './containers/AboutUs';
import Footer from './components/Footer';
import Header from './components/Header';
import NotFound from './containers/PageNotFound';
import UnAuthorized from './containers/UnAuthorized';
import Notification from './containers/Notification';
import Feedback from './containers/Feedback';
import { USER_ROLES } from './components/Header/roles';


const PublicRoute = ({ component: Component, authed, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => (authed === false ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />)}
		/>
	);
};
const PrivateRoute = ({ component: Component, authed, routes, ...rest }) => {
	const isRoutePermitted = routes ? routes.indexOf(rest.path) !== -1 : true;
	return (
		<Route
			{...rest}
			render={(props) => (authed === true ? isRoutePermitted ? <Component {...props} /> : <Redirect to={{ pathname: '/unauthorized' }} /> : <Redirect to={{ pathname: '/signin' }} />)}
		/>
	);
};
/**
 * Bootstarp of application 
 * This component is consits of Routing which render pages based of user Previlages.
 * 
 */
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false,
			permittedRoutes: []
		};
	}
	componentWillMount() {
		const isAuthenticated = cookie.load('accesstoken') ? true : false;
		const userdetails = JSON.parse(localStorage.getItem('userdetails'));
		const role = userdetails ? userdetails.data.profile.role.toUpperCase() : '';
		const permittedRoutes = USER_ROLES[role] ? USER_ROLES[role].ROLES.map(r => r.link) : [];
		this.setState({
			isAuthenticated,
			permittedRoutes
		});
	}

	componentDidMount() {		
		ReactGA.initialize('UA-135604230-1');
		ReactGA.pageview(window.location.pathname + window.location.search);
	}

	changeState(flag) {
		this.setState({ isAuthenticated: flag });
	}

	render() {
		const authenticated = this.state.isAuthenticated;
		const permittedRoutes = this.state.permittedRoutes;
		return (
			<Router>
				<Fragment>
					{authenticated ? (
						<Header 
							{...this.props}
							changeState={(state) => {
								this.changeState(state);
							}}
						/>
					) : (
						''
					)}
					<section className={authenticated ? "main-wrapper" : "main-wrapper public-wrapper"}>
						<Switch>
							<Route
								path="/aboutus"
								exact
								component={() => (
									<AboutUs
										changeState={(state) => {
											this.changeState(state);
										}}
									/>
								)}
							/>
							<PrivateRoute
								path="/"
								exact
								component={() => (
									<Dashboard
										changeState={(state) => {
											this.changeState(state);
										}}
									/>
								)}
								authed={authenticated}
							/>
							<PrivateRoute path="/search" exact component={SearchPage} authed={authenticated} />
							<PrivateRoute
								path="/search/:searchkey"
								exact
								component={SearchPage}
								authed={authenticated}
							/>
							<PrivateRoute
								path="/notification"
								exact
								component={() => (
									<Notification
										changeState={(state) => {
											this.changeState(state);
										}}
									/>
								)}
								authed={authenticated}
								routes={permittedRoutes}
							/>
							
							<Route
								path="/feedback"
								exact
								component={() => (
									<Feedback
										changeState={(state) => {
											this.changeState(state);
										}}
									/>
								)}
								authed={authenticated}
							/>
							<PrivateRoute path="/user" exact component={UserProfile} authed={authenticated} />
							<PublicRoute
								path="/signin"
								exact
								component={() => (
									<Login
										changeState={(state) => {
											this.changeState(state);
										}}
									/>
								)}
								authed={authenticated}
							/>
							<PublicRoute path="/signup" exact component={Register} authed={authenticated} />
							<PrivateRoute path="/unauthorized" exact component={UnAuthorized} authed={authenticated} />
							<PrivateRoute path="*" exact component={NotFound} authed={authenticated} />
						</Switch>
						<Footer />
					</section>
				</Fragment>
			</Router>
		);
	}
}

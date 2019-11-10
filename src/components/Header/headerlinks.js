import React, { Component } from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { USER_ROLES } from './roles';

/**
 * Class representing a Header Links Component
 */
class HeaderLinks extends Component {
	/**@constructor
 * constructor function of Header Links Class
 * @param {Object} props
 * global properties object
 */
	constructor(props) {
		super(props);
		this.state = {
			name: cookie.load('name'),
			role: JSON.parse(localStorage.getItem('userdetails'))
				? JSON.parse(localStorage.getItem('userdetails')).data.profile.role
				: null || null
		};
		this.roleWiseTemplate = this.roleWiseTemplate.bind(this);
	}

	componentWillReceiveProps(props) {}

	logoutHandler() {
		cookie.remove('accesstoken', { path: '/', domain: '' });
		cookie.remove('name', { path: '/', domain: '' });
		localStorage.clear();
		this.props.changeState(false);
		this.props.history.push('/signin');
	}

	roleWiseTemplate() {
		const menulist = USER_ROLES[this.state.role].ROLES.map((role, k) => {
			return (
				<MenuItem href={`${role.link}`} key={k} eventKey={2.1}>
					{role.title}
				</MenuItem>
			);
		});

		return menulist;
	}
	/**
 * @function render
 * render function of Header Links Class
 */
	render() {
		const users = (
			<div>
				<i className="fa fa-gear" />
				<b className="caret" />
				<p className="hidden-lg hidden-md" />
			</div>
		);

		return (
			<div>
				<Nav pullRight>
					<li>
						<Link to={`/search`}>
							<i className="fa fa-search search-icon" />
						</Link>
					</li>

					<NavItem eventKey={1} href="#">
						<Link to={`/message`}>
							<i className="fa fa-bell" />
							<span className="notification">0</span>
						</Link>
					</NavItem>

					{(() => {
						if (USER_ROLES[this.state.role]) {
							if (USER_ROLES[this.state.role].ROLES.length > 0) {
								return (
									<NavDropdown eventKey={2} title={users} noCaret id="basic-nav-dropdown">
										{this.roleWiseTemplate()}
									</NavDropdown>
								);
							}
						}
					})()}

					<NavDropdown eventKey={2} title={this.state.name} id="basic-nav-dropdown-right">
						<MenuItem eventKey={2.1} href="/user">
							Account
						</MenuItem>
						<MenuItem eventKey={2.2} href="/history">
							History
						</MenuItem>
						<MenuItem divider />
						<MenuItem
							eventKey={2.3}
							href="javascript:void(0)"
							onClick={() => {
								this.logoutHandler();
							}}
						>
							Log Out
						</MenuItem>
					</NavDropdown>
				</Nav>
			</div>
		);
	}
}

export default withRouter(HeaderLinks);

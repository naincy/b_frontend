import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import unauthorized from '../../assets/img/unauthorized.gif';

/**
 * This class contains the Not found Look and feel . 
 * 1) Application redirect to this page once user try to hit invalid route
 */

class UnAuthorized extends Component {
	/**
	 * Render the component
	 * @param none
	 */
	render() {
		return (
			<Fragment>
				<section className="wrapper">
					<div className="container  text-center wrapper-container">
						<div className="col-md-12">
							<div className="error-content section-title text-center">
								<img className="unauthorized-img" src={unauthorized} alt="unauthorized" />
								<hr className="hr-primary" />
								<h2>
									<span> oops!</span> you are not authorized
								</h2>
								<p>
									We are sorry, you are not authorized to view the requested page,<br />
									Please Go back to Home Page!
								</p>
								<Link to="/" className="back-home">
									Visit Homepage
								</Link>
							</div>
						</div>
					</div>
				</section>
			</Fragment>
		);
	}
}

export default withRouter(UnAuthorized);

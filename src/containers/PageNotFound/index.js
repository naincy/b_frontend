import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
// import '../assets/sass/notfound.css'

/**
 * This class contains the Not found Look and feel . 
 * 1) Application redirect to this page once user try to hit invalid route
 */

class NotFound extends Component {
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
								<h1>
									<span className="four">4</span>
									<span className="zero">0</span>
									<span className="four">4</span>
								</h1>
								<hr className="hr-primary" />
								<h2>
									<span> oops !</span> page not found
								</h2>
								<p>
									We are sorry the page your are requested could not found ,<br />
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

export default withRouter(NotFound);

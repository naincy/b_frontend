import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import { Link } from 'react-router-dom';

/**
 * Class representing a Footer Component
 */
class Footer extends Component {
  /**
 * @function render
 * render function of Footer Class
 */
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()}{" "}
            CodeBrewers
          </p>
          <p className="copyright pull-left">
            <Link to="/">Home</Link>
          </p>
          <p className="copyright pull-left">
            <Link to="/aboutus">About Us</Link>
          </p>
          <p className="copyright pull-left">
            <Link to="/feedback">Feedback</Link>
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;

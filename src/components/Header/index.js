import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

import HeaderLinks from "./headerlinks.js";

import Logo from '../../assets/img/logo.png';
import { Link } from "react-router-dom";

/**
 * Class representing a Header Component
 */ 
class Header extends Component {
/**@constructor
 * constructor function of Header Class
 * @param {Object} props
 * global properties object
 */
  constructor(props) {
    super(props);

    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false
    };
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  }
 /**
 * @function render
 * render function of Header Class
 */
  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            
            <Link to={`/`}  className="logo-wrapper">
            <img src={Logo} className="logo-img" alt="benchmark" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <HeaderLinks changeState={(state)=>{this.props.changeState(state)}} />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;

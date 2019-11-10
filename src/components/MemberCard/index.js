import React, { Component } from "react";
import { Image } from "react-bootstrap";
import Button from '../CustomButton';

/**
 * Class representing a Member Card Component
 */
export class MemberCard extends Component {
  
/**
 * @function render
 * render function of Tech Card Class
 */
  render() {
    return (
        <div className={`member-section ${this.props.userclass}`} >
            <Image src= {`${window.location.origin}/img/member/${this.props.useravatar}`} alt="userimage" />
            <div className="detail-section">
                <h5>{this.props.username}</h5>
                <h6>{this.props.usertitle}</h6>
                <hr />
                <div className="social-share">
                    <Button simple>
                        <a href={this.props.userfb} target="_blank"><i className="fa fa-facebook-square" /></a>
                    </Button>
                    <Button simple>
                        <a href={this.props.userlinkedin} target="_blank"><i className="fa fa-linkedin" /></a>
                    </Button>
                    <Button simple>
                        <a href={this.props.usergithub} target="_blank"><i className="fa fa-github-square" /></a>
                    </Button>
                </div>
            </div>
        </div>
    );
  }
}

export default MemberCard;

import React, { Component } from "react";

/**
 * Class representing a User Card Component
 */
export class UserCard extends Component {
  
/**
 * @function render
 * render function of User Card Class
 */
  render() {
    return (
      <div className="card card-user wrapper-shadow">
        <div className="image">
          <img src={this.props.bgImage} alt="..." />
        </div>
        <div className="content">
          <div className="author">
            <a href="#pablo">
              <img
                className="avatar border-gray"
                src={this.props.avatar}
                alt="..."
              />
              <h4 className="title">
                {this.props.name}
                <br />
                <small>{this.props.userName}</small>
              </h4>
            </a>
          </div>
          <p className="description text-center">{this.props.description}</p>
        </div>
        <hr />
        <div className="text-center">{this.props.socials}</div>
      </div>
    );
  }
}

export default UserCard;

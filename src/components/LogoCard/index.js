import React, { PureComponent } from "react";

/**
 * Class representing a User Card Component
 */
export class UserCard extends PureComponent {
  /**
 * @function render
 * render function of User Card Class
 */
  render() {
    return (
      <div className={this.props.color ? `card logo-card ${this.props.color}` : "card logo-card"}>
        <div className="logo-image">
          <img src={`${window.location.origin}/img/logo/${this.props.logoImage}`} alt={this.props.logoAlt}  style={{borderRadius:"48px" }}/>
        </div>
        <div className="card-content">
          <div className="card-name">
            {this.props.name}
          </div>
          <div className="card-desc">
            <span className="enrollment">
              {this.props.enrollment}
            </span>
            <span className="enrollment-text">
              Enrollments
            </span>
          </div>
        </div>
        <div className="card-footer">
          {
            [...Array(5)].map((e, i) => (i < this.props.stars ? <i key={i} className="fa fa-star checked golden" /> : <i key={i} className="fa fa-star checked" />))
          }
        </div>
      </div>
    );
  }
}

export default UserCard;

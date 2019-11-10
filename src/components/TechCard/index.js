import React, { Component } from "react";

/**
 * Class representing a Tech Card Component
 */
export class TechCard extends Component {
  
/**
 * @function render
 * render function of Tech Card Class
 */
  render() {
    return (
      <div className="card card-stats">
        <div className="content">
          <img src={this.props.imagePath} alt="tech-card-img" />
          <div className="footer">
            <hr />
            <div className="stats">
              <div className="title">
                {this.props.title}              
              </div>
              <div className="owner">By: {this.props.owner}</div>
              <div className="likes"><i className="icon-big pe-7s-like2"></i>23783</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TechCard;

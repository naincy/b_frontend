import React, { Component } from "react";


/**
 * Class representing a Card component
 */
export class Card extends Component {

/**
 * @function render
 * render function of Card class
 */
  render() {
    return (
      <div className={"card wrapper-shadow" + (this.props.plain ? " card-plain" : "")}>
        <div className={"header" + (this.props.hCenter ? " text-center" : "")}>
          <h4 className="title">{this.props.title} <span>{this.props.coloredTitle}</span></h4>
          <p className="category">{this.props.category}</p>
        </div>
        <div
          className={  "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
          {this.props.content}
          {this.props.stats || this.props.statsIcon ? <div className="footer">
            {this.props.legend}
            {this.props.stats != null ? <hr /> : ""}
            <div className="stats">
              <i className={this.props.statsIcon} /> {this.props.stats}
            </div>
          </div>
          : '' }
        </div>
      </div>
    );
  }
}

export default Card;

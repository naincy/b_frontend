import React, { Component } from "react";
import { Button } from "react-bootstrap";
import cx from "classnames";
import PropTypes from "prop-types";

/**
 * Class representing a Custom Button Component
 */
class CustomButton extends Component {

/**
 * @function render
 * render function of Custom Button Component
 */
  render() {
    const { fill, simple, pullRight, round, block, ...rest } = this.props;

    const btnClasses = cx({
      "btn-fill": fill,
      "btn-simple": simple,
      "pull-right": pullRight,
      "btn-block": block,
      "btn-round": round
    });

    return <Button className={btnClasses} {...rest} />;
  }
}

CustomButton.propTypes = {
  fill: PropTypes.bool,
  simple: PropTypes.bool,
  pullRight: PropTypes.bool,
  block: PropTypes.bool,
  round: PropTypes.bool
};

export default CustomButton;

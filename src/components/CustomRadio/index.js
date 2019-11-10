import React, { Component } from "react";


/**
 * Class representing a Custom Radio Button Component
 */
class CustomRadio extends Component {

/**
 * @function render
 * render function of Custom Radio Button Component
 */
  render() {
    const { number, label, option, name, ...rest } = this.props;

    return (
      <div className="radio">
        <input id={number} name={name} type="radio" value={option} {...rest} />
        <label htmlFor={number}>{label}</label>
      </div>
    );
  }
}

export default CustomRadio;

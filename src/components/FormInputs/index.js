import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Row } from "react-bootstrap";

function FieldGroup({ label, ...props }) {
  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

/**
 * Class representing a Form Inputs Component
 */
export class FormInputs extends Component {
  
/**
 * @function render
 * render function of Form Inputs Class
 */
  render() {
    var row = [];
    for (var i = 0; i < this.props.ncols.length; i++) {
      row.push(
        <div key={i} className={this.props.ncols[i]}>
          <FieldGroup {...this.props.proprieties[i]} />
        </div>
      );
    }
    return <Row>{row}</Row>;
  }
}

export default FormInputs;

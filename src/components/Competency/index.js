import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from '../Card';

import {
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
} from "variables/Variables.js";

/**
 * Class representing a Competency Component
 */
class Competency extends Component {
    createLegend(json) {
      var legend = [];
      for (var i = 0; i < json["names"].length; i++) {
        var type = "fa fa-circle text-" + json["types"][i];
        legend.push(<i className={type} key={i} />);
        legend.push(" ");
        legend.push(json["names"][i]);
      }
      return legend;
    }

    onDrawHandler(data) {
      data.element.animate({
        y2: {
          dur: 1000,
          from: data.y1,
          to: data.y2,
        },
        opacity: {
          dur: 1000,
          from: 0,
          to: 1,
        }
      });
    }
/**
 * @function render
 * render function of Competency component
 */
    render() {
      return(
        <div className="content competency-wrapper">
          <Grid fluid>
            <Row>
              <Col sm={12}>
                <Card
                      id="chartActivity"
                      title="Competency Matrix"
                      category="As per Industry standards"
                      stats="Data information based on experience and completed courses"
                      statsIcon="fa fa-check"
                      content={
                        <div className="ct-chart">
                          <ChartistGraph
                            listener={{
                                draw: e => this.onDrawHandler(e)
                            }}
                            data={dataBar}
                            type="Bar"
                            options={optionsBar}
                            responsiveOptions={responsiveBar}
                          />
                        </div>
                      }
                      legend={
                        <div className="legend">{this.createLegend(legendBar)}</div>
                      }
                    />
              </Col>
              </Row>
            </Grid>
        </div>
      )
    }
  }
  
  export default Competency;
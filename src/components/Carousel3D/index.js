import React, { Component } from 'react';

import Image1 from 'assets/img/carousel/img1.jpg';
import Image2 from 'assets/img/carousel/img2.jpg';
import Image3 from 'assets/img/carousel/img3.jpg';

/**
 * Class representing a Carousel3D component
 */
class Carousel3D extends Component {
/**@constructor
 * constructor function of Carousel3D component class
 * @param {Object} props
 * global properties object
 */
  constructor(props) {
    super(props);
    this.state = {
      figTransform: ''
    };
    this.theta = 2 * Math.PI / 3;
    this.currImage = 0;
    this.apothem = 500 / (2 * Math.tan(Math.PI / 3));
  }

  changeSlide(e) {
    e.stopPropagation();

    const t = e.target;
    if (t.tagName.toUpperCase() !== 'BUTTON') {
      return;
    }

    if (t.classList.contains('next')) {
      this.currImage++;
    }
    else {
      this.currImage--;
    }

    this.setState({
      figTransform: `rotateY(${this.currImage * -this.theta}rad)`,
    });
  }
/**
 * @function render
 * render function of Carousel3D component class
 */
  render() {
    return (
      <div className="carousel">
        <figure style={this.state.figTransform ? { transform: this.state.figTransform } : { transform: 'initial' }}>
          <img src={Image1} alt="trending tech" />
          <img src={Image2} alt="reports" />
          <img src={Image3} alt="reccomandation" />
          <img src={Image1} alt="trending tech" />
          <img src={Image1} alt="trending tech" />
          <img src={Image2} alt="reports" />
          <img src={Image3} alt="reccomandation" />
          <img src={Image3} alt="reccomandation" />
        </figure>
        <nav onClick={this.changeSlide.bind(this)}>
          <button className="nav prev">
            Prev
          </button>
          <button className="nav next">
            Next
          </button>
        </nav>
      </div>
    );
  }
}

export default Carousel3D;

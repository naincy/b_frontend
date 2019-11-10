import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../assets/sass/carousellisting.css';


import CourseCard from  './Card';

import { withRouter } from 'react-router-dom';

/**
 * Class representing a CarouselCard Component
 */
class CarouselCardComponent extends Component {
/**
 * @constructor
 * constructor function of CarouselCard Component class
 * @param {Object} props
 * global properties object
 */
	constructor(props) {
		super(props);
		this.state = {
			currentIndex: 1,
			to: 100,
			itemList: props.courses,
			responsive: {
				0: { items: 1 },
				600: { items: 2 },
				1024: { items: this.props.count || 4 }
			}
		};

		this.ENTITY_CLICK = 'entity-click';
		this.NAV_NEXT = 'carousel-click-next';
		this.PREV_NEXT = 'carousel-click-previous';
	}
/**
 * @function componentWillReceiveProps
 * component Will Receive Props life cycle function of CarouselCard Component class
 * @param {Object} props
 * global properties object
 */
	componentWillReceiveProps(props) {
		this.setState({
			...this.state,
			itemList: [ ...props.courses ]
		});
	}

	prevClick() {
		this.Carousel._slidePrev();
	}

	nextClick() {
		this.Carousel._slideNext();
	}

	articleTemplate() {
		const template = this.state.itemList.map((item, i) => {
		
			return (<CourseCard item={item}/>);
		});
		return template;
	}
/**
 * @function render
 * render function of Carousel Card component
 */
	render() {
		const items = this.articleTemplate();
		return (
			<div className="carousel-listing">
				<div className="c-container">
					<div className="prevbtn bttn" onClick={() => this.prevClick()}>
						<img src={`${window.location.origin}/img/prev.png`} alt="img"/>
					</div>
					<AliceCarousel
						fadeOutAnimation={false}
						autoPlayDirection="ltr"
						autoPlay={false}
						duration={900}
						startIndex={this.state.currentIndex}
						items={items}
						mouseDragEnabled={false}
						responsive={this.state.responsive}
						dotsDisabled={true}
						buttonsDisabled={true}
						ref={(el) => (this.Carousel = el)}
					/>
					<div className="nxtbtn bttn" onClick={() => this.nextClick()}>
						<img src={`${window.location.origin}/img/next.png`} alt="img"/>
					</div>
				</div>
			</div>
		);
	}
}
export default withRouter(CarouselCardComponent);

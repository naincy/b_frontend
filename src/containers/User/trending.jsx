import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../assets/sass/carousellisting.css';

import { withRouter } from 'react-router-dom';

/**
 *  This Class is container for CourseCard 
 *   
 */

class CourseCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentIndex: 0,
			to: 100,
			cards: [ ...props.cards ],
			folder: props.folder,
			autoPlay: props.autoPlay || false,
			navigation: props.navigation !== undefined ? props.navigation : true || true,
			duration: props.duration || 2000,
			dotsDisabled: props.dotsDisabled !== undefined ? props.dotsDisabled : true || true,
			responsive: {
				0: { items: 1 },
				600: { items: 2 },
				1024: { items: props.count || 4 }
			}
		};

		this.ENTITY_CLICK = 'entity-click';
		this.NAV_NEXT = 'carousel-click-next';
		this.PREV_NEXT = 'carousel-click-previous';
	}

	componentWillReceiveProps(props) {
		this.setState({
			...this.state,
			cards: [ ...props.cards ],
			folder: props.folder,
			autoPlay: props.autoPlay || false,
			navigation: props.navigation !== undefined && props.navigation !== null ? props.navigation : true || true,
			duration: props.duration || 2000,
			dotsDisabled: props.dotsDisabled !== undefined ? props.dotsDisabled : true || true,
			responsive: {
				0: { items: 1 },
				600: { items: 2 },
				1024: { items: props.count || 4 }
			}
		});
	}

	prevClick() {
		this.Carousel._slidePrev();
	}

	nextClick() {
		this.Carousel._slideNext();
	}

	articleTemplate() {
		const template = this.state.cards.map((item, i) => {
			return (
				<div key={i}>
					<img
						style={{ width: '100%' }}
						src={`${window.location.origin}/img/tech/${this.state.folder}/${item}`}
						alt="img"
					/>
				</div>
			);
		});
		return template;
	}

	render() {
		const items = this.articleTemplate();
		return (
			<div className="carousel-listing">
				<div className="c-container">
					{(() => {
						if (this.state.navigation) {
							return (
								<div className="prevbtn bttn" onClick={() => this.prevClick()}>
									<img src={`${window.location.origin}/img/prev.png`} alt="img" />
								</div>
							);
						}
					})()}

					<AliceCarousel
						fadeOutAnimation={false}
						autoPlayDirection="ltr"
						autoPlay={this.state.autoPlay}
						duration={this.state.duration}
						startIndex={this.state.currentIndex}
						items={items}
						mouseDragEnabled={true}
						responsive={this.state.responsive}
						dotsDisabled={this.state.dotsDisabled}
						buttonsDisabled={true}
						ref={(el) => (this.Carousel = el)}
					/>

					{(() => {
						if (this.state.navigation) {
							return (
								<div className="nxtbtn bttn" onClick={() => this.nextClick()}>
									<img src={`${window.location.origin}/img/next.png`} alt="img" />
								</div>
							);
						}
					})()}
				</div>
			</div>
		);
	}
}
export default withRouter(CourseCard);

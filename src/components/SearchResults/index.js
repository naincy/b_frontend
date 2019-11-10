import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { searchService, saveUserData } from '../../service/http';
import Loader from '../Loader';
import Masonry from 'react-masonry-component';
import CourseCard from '../CarouselCard/Card';

const masonryOptions = {
	transitionDuration: 6
};
const imagesLoadedOptions = { background: '.my-bg-image-el' };

/**
 * Class representing a Search Results Component
 */

const initialState = {
	coursesList: [],
	keyword: '',
	loading: true
};

export class SearchResults extends Component {
/**@constructor
 * constructor function of Search Results Class
 * @param {Object} props
 * global properties object
 */

	constructor(props) {
		super(props);
		this.state = { ...initialState, keyword: props.searchkey, levels: props.filterKey };
	}
	/**
 * @function componentDidMount
 * component Did Mount life cycle function of Search Results class
 */
	componentWillMount() {
		this.serviceCall(this.props.searchkey, this.props.filterKey);
	}
	/**
 * @function componentDidMount
 * component Will Receive Props life cycle function of Search Results class
 */
	componentWillReceiveProps(newprops) {
		if (newprops.searchkey !== this.state.keyword || newprops.filterKey !== this.state.levels) {
			this.serviceCall(newprops.searchkey, newprops.filterKey);
		}
	}

	resetToInitial() {
		this.setState({ ...initialState });
	}

	serviceCall(key, levels) {
		let courseListData = [];
		this.resetToInitial();
		searchService(key, levels).then((res) => {		
			if (res.status === 200) {
				courseListData = res.data.courses;

			}
			this.setState({
				...this.state,
				coursesList: [ ...courseListData ],
				loading: false,
				keyword: key,
				levels
			});

			if (courseListData.length > 0) {
				let obj = {
					user: {
						email: JSON.parse(localStorage.getItem('userdetails')).data.email,
						searchText: key.toLowerCase()
					}
				};
				if (key.length) {
					saveUserData(obj);
					let initialUserData = JSON.parse(localStorage.getItem('userdetails'));
					let initialHistory = initialUserData.data.profile.searchHistory;
					if (!initialHistory.includes(key.toLowerCase())) {
						initialHistory.push(key.toLowerCase());
					}

					initialUserData.data.profile.searchHistory = initialHistory;
					localStorage.setItem('userdetails', JSON.stringify(initialUserData));
				}
			}
		});
	}

	cardRender() {
		let template = '';
		if (this.state.coursesList.length > 0) {
			template = this.state.coursesList.map((data, i) => {
				return (
					<Col key={i} md={3} style={{ marginBottom: '10px' }}>
						<CourseCard item={data} crown={'L'} />
					</Col>
				);
			});
		} else {
			return (
				<Row>
					<Col md={12}>
						<div className="text-center">
							<h3> No Record Found !!</h3>
						</div>
					</Col>
				</Row>
			);
		}

		return template;
	}

	/**
 * @function render
 * render function of Search Results Class
 */
	render() {
		return (
			<Row>
				<Col md={12}>
					<div className="search_details_container">
						<Row>
							<Col md={12}>
								<div className="section-heading-search">
									<h5>Search Results<span>{this.state.keyword ? ': ' + this.state.keyword : ''}</span></h5>
								</div>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								{(() =>
									!this.state.loading ? (
										<Masonry
											className={'my-gallery-class'}
											options={masonryOptions}
											updateOnEachImageLoad={false}
											imagesLoadedOptions={imagesLoadedOptions}
										>
											{this.cardRender()}
										</Masonry>
									) : (
										<Loader />
									))()}
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
		);
	}
}

export default SearchResults;

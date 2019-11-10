import React, { Component, Fragment } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import SearchResults from '../../components/SearchResults';
import Search from '../../components/Search';
import HistoryTagsCard from '../../components/HistoryTagsCard';
import FilterCard from '../../components/FilterCard'
import { getCollaborativeDataForUser } from '../../service/http';
/**
 * This class contains the Search page container , Consist of multiple components in it.
 * 1) SearchResults componenmt
 * 2) HistoryTagsCard componenmt
 */
class SearchPage extends Component {
	/**
	 * Constructor
	 * @param {none}
	 */
	constructor(props) {
		super(props);
		this.state = {
			key:
				props.match.params.searchkey !== undefined && props.match.params.searchkey !== ''
					? props.match.params.searchkey
					: '',
			historyTags: JSON.parse(localStorage.getItem('userdetails')).data.profile.searchHistory || [],
			filter: '',
			recentView: [],
			userDetail: JSON.parse(localStorage.getItem('userdetails')),
		};
	}
	/**
	 * To manage the state change
	 * @param {string} keyvalue
	 */
	changestate(keyvalue) {
		this.setState({ key: keyvalue });
	}

	filterchangeState(value) {
		let v = [];
		for (var key in value) {
			if (value.hasOwnProperty(key) && value[key]) {
				v.push(key);
			}
		 }
		 this.setState({filter: v.join(',')})
	}

	/**
	 * life Cycle function which trigger on new props recieve
	 * @param {*} props 
	 */
	componentWillReceiveProps(props) {
		this.setState({
			key:
				props.match.params.searchkey !== undefined && props.match.params.searchkey !== ''
					? props.match.params.searchkey
					: ''
		});
	}
	/**
	 * Life Cycle function trigger just after initilaization
	 * @param {none}
	 */
	componentWillMount() {
		const email = this.state.userDetail!== null ? this.state.userDetail.data.email:'';		
		if (email && this.state.userDetail.data.profile.searchHistory.length) {
			/**
			 * Get the collaborative data for user
			 * @param {string} email
			 */
			getCollaborativeDataForUser(email).then((res) => {
				if (res) {
					this.setState({
						...this.state,
						recentView: res.data && res.data.topSearchRecommendations ? [ ...res.data.topSearchRecommendations ] : []
					});
					// console.log(res)
				}
			});
		}
	}
	/**
	 * Render the component
	 * @param none
	 */
	render() {
		return (
			<div className="wrapper">
				<div id="main-panel" className="main-panel" ref="mainPanel">
					<div className="content">
						<Grid fluid>
							<Row>
								<Col md={10} xs={12} mdOffset className="no-padding-mob pull-right">
									<Search
										changeState={(key) => {
											this.changestate(key);
										}}
									/>

								</Col>
							</Row>
							<Row>
								<Col md={2} className="no-padding-mob">
									<Fragment>
									<div className="history_tags_container">
										<Row>
											<Col md={12}>
												<div className="section-heading-search">
													<h5>Filter <span>Courses</span></h5>
												</div>
											</Col>

											<Col md={12}>
											<FilterCard filterchangeState={(key) => {
													this.filterchangeState(key);
												}}/>
											</Col>
										</Row>
									</div>
									{this.state.historyTags.length ?
									<div className="history_tags_container">
										<Row>
											<Col md={12}>
												<div className="section-heading-search">
													<h5>Recent <span>Searches</span></h5>
												</div>
											</Col>

											<Col md={12}>
												<HistoryTagsCard tagsList={this.state.historyTags} />
											</Col>
										</Row>
									</div>
									: null }
									{this.state.recentView.length ?
										 <div className="history_tags_container">
										<Row>
											<Col md={12}>
												<div className="section-heading-search">
													<h5>People Also <span>Searched For</span></h5>
												</div>
											</Col>

											<Col md={12}>
												<HistoryTagsCard tagsList={this.state.recentView} />
											</Col>
										</Row>
									</div> : null}
									
									</Fragment>
								</Col>
								<Col md={10} className="no-padding-mob">
									<SearchResults searchkey={this.state.key} filterKey={this.state.filter} />
								</Col>
							</Row>
						</Grid>
					</div>
				</div>
			</div>
		);
	}
}

export default SearchPage;

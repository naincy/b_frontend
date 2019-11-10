import React from 'react';
import Autosuggest from 'react-autosuggest';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import { languages } from '../../variables/Variables';

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value) => {
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;

	return inputLength === 0
		? []
		: languages.filter((lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue);
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.

const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

/**
 * Class representing a Search Component
 */
class Search extends React.Component {
	/** @constructor
 * constructor function of Search Class
 * @param {Object} props
 * global properties object
 */
	constructor(props) {
		super(props);

		// Autosuggest is a controlled component.
		// This means that we to provide an input value
		// and an onChange handler that updates this value (see below).
		// Suggestions also need to be provided to the Autosuggest,
		// and they are initially empty because the Autosuggest is closed.
		this.state = {
			value: '',
			suggestions: []
		};
	}

	getSuggestionValue = (suggestion) => {
		this.props.changeState(suggestion.name);
		ReactGA.event({
			category: 'Search',
			action: 'Course Search',
			label: suggestion.name
		});

		return suggestion.name;
	};

	onChange = (event, { newValue }) => {
		this.setState({
			value: newValue
		});
	};

	// Autosuggest will call this function every time you need to update suggestions.
	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: getSuggestions(value)
		});
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	/**
 * @function render
 * render function of Search Class
 */
	render() {
		const { value, suggestions } = this.state;

		// Autosuggest will pass through all these props to the input.
		const inputProps = {
			placeholder: 'eg. : react, java ',
			value,
			onChange: this.onChange
		};

		return (
			<div className="search-parent-cont">
				<i className="fa fa-search search-icon search-icon-box" />
				<Autosuggest
					suggestions={suggestions}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested}
					getSuggestionValue={this.getSuggestionValue}
					renderSuggestion={renderSuggestion}
					inputProps={inputProps}
				/>
			</div>
		);
	}
}
export default withRouter(Search);

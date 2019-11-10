import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import '../../assets/sass/tags.css';
/**
 * Class representing a Card component
 * 
 */
export class AddTag extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tags: [ ...props.tags ]
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			tags: [ ...props.tags ]
		});
	}

	/**
 * @function render
 * render function of Card class
 */
	handleChange(tags) {
		this.setState({ tags: [ ...tags ] }, () => {
			this.props.onChangeTag(this.state.tags);
		});
	}

	render() {
		return (
			<TagsInput
				value={this.state.tags}
				inputProps={{
					placeholder: this.props.placeholder
				}}
				onChange={(e) => this.handleChange(e)}
			/>
		);
	}
}

export default AddTag;

import React, { Component } from 'react';

class FileItem extends Component {

	constructor(props) {
		super(props);

		this.onLoadFromFileClicked = this.onLoadFromFileClicked.bind(this);
		this.onDeleteFileClicked = this.onDeleteFileClicked.bind(this);
	}

	onLoadFromFileClicked() {
		this.props.onLoadFromFileClicked(this.props.file);
	}

	onDeleteFileClicked() {
		this.props.onDeleteFileClicked(this.props.file);
	}

	render() {
		return (
			<tr>
				<td>{this.props.file}</td>
				<td>
					<button onClick={this.onLoadFromFileClicked} className="btn btn-default" type="button">Load points</button>
					<button onClick={this.onDeleteFileClicked} className="btn btn-danger" type="button">Delete file</button>
				</td>
			</tr>
		)
	}
}

export default FileItem;

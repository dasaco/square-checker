import React, { Component } from 'react';

import './fileinput.scss';

class FileInput extends Component {

	constructor(props) {
		super(props);

		this.state = {
			fileName: ''
		}

		this.onFileSaveClicked = this.onFileSaveClicked.bind(this);
		this.onFileNameChanged = this.onFileNameChanged.bind(this);
	}

	componentDidMount() {
		const alertOptions = {
	    offset: 14,
	    position: 'bottom left',
	    theme: 'dark',
	    time: 5000,
	    transition: 'scale'
	  }
	}

	onFileNameChanged(event) {
		this.setState({fileName: event.target.value });
	}

	onFileSaveClicked(event) {
		event.preventDefault();
		const { fileName } = this.state;
		if(fileName != '') {
			this.props.onFileSaveClicked(fileName);
		}
	}

	render() {
		return (
			<div className="fileinput">
				<p className="fileinput__save-text">Save current points to file</p>
				<form onSubmit={this.onFileSaveClicked}>
					<div className="row">
						<div className="col-md-6">
							<div className="form-group">
								<input placeholder="Filename" id="filename" className="form-control" type="text" value={this.state.fileName} onChange={this.onFileNameChanged} />
							</div>
						</div>
						<div className="col-md-2">
							<input className="btn btn-success" type="submit" value={"Save to " + this.state.fileName + ".txt"} />
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default FileInput;

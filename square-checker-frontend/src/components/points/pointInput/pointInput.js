import React, { Component } from 'react';

import './pointInput.scss';

class PointInput extends Component {

	constructor(props) {
		super(props);

		this.state = {
			x: null,
			y: null
		};

		this.onXChanged = this.onXChanged.bind(this);
		this.onYChanged = this.onYChanged.bind(this);
		this.addPoint = this.addPoint.bind(this);
	}

	onXChanged(evt) {
		this.setState({x: evt.target.value});
	}

	onYChanged(evt) {
		this.setState({y: evt.target.value});
	}

	addPoint(evt) {
		evt.preventDefault();
		this.props.onPointAdd(this.state.x, this.state.y);
	}

	render() {
		return (
			<div>
				<form className="pointform" onSubmit={this.addPoint}>
					<div className="row">
						<div className="col-md-5">
							<div className="form-group">
								<label htmlFor="x">X:</label>
								<input id="x" className="form-control" type="text" onChange={this.onXChanged} />
							</div>
						</div>
						<div className="col-md-5">
							<div className="form-group">
								<label htmlFor="y">Y:</label>
								<input id="y" className="form-control" type="text" onChange={this.onYChanged} />
							</div>
						</div>
						<div className="col-md-2">
							<input className="pointform__submit-btn btn btn-success" type="submit" value="Add" />
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default PointInput;

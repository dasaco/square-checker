import React, { Component } from 'react';

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
				<form onSubmit={this.addPoint}>
					<input type="text" onChange={this.onXChanged} />
					<input type="text" onChange={this.onYChanged} />
					<input type="submit" />
				</form>
			</div>
		)
	}
}

export default PointInput;

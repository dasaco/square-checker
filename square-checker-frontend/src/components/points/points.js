import React, { Component } from 'react';

import PointList from './pointList/pointList';
import PointInput from './pointInput/pointInput';

class Points extends Component {

	constructor(props) {
		super(props);

		this.onPointAdd = this.onPointAdd.bind(this);
	}

	onPointAdd(x, y) {
		this.props.onPointAdd(x, y);
	}

	render() {
		return (
			<div>
				<PointList onRemoveClick={this.props.onRemovePoint} squares={this.props.squares}/>
				<PointInput onPointAdd={this.props.onPointAdd} />
			</div>
		)
	}
}

export default Points;

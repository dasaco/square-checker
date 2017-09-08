import React, { Component } from 'react';

class PointItem extends Component {

	constructor(props) {
		super(props);

		this.onRemoveClick = this.onRemoveClick.bind(this);
	}

	onRemoveClick() {
		this.props.onRemoveClick(this.props.index);
	}

	render() {
		return (
			<tr>
				<td><a onClick={this.onRemoveClick}>X</a></td>
				<td>{this.props.point.x}</td>
				<td>{this.props.point.y}</td>
			</tr>
		)
	}
}

export default PointItem;
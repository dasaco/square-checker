import React, { Component } from 'react';

class SquareItem extends Component {

	constructor(props) {
		super(props);
	}

	onRemoveClick() {
		this.props.onRemoveClick(this.props.index);
	}

	render() {
		return (
			<tr>
				<td>{this.props.square.p1.x}, {this.props.square.p1.y}</td>
				<td>{this.props.square.p2.x}, {this.props.square.p2.y}</td>
				<td>{this.props.square.p3.x}, {this.props.square.p3.y}</td>
				<td>{this.props.square.p4.x}, {this.props.square.p4.y}</td>
			</tr>
		)
	}
}

export default SquareItem;

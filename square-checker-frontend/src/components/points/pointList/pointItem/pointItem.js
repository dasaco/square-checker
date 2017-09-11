import React, { Component } from 'react';

import './pointItem.scss';

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
				<td>{this.props.point.x}</td>
				<td>{this.props.point.y}</td>
				<td className="text-right">
					<a className="remove" onClick={this.onRemoveClick}>
						<img src="/img/delete.svg" />
					</a>
				</td>
			</tr>
		)
	}
}

export default PointItem;

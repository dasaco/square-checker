import React, { Component } from 'react';

import PointItem from './pointItem/pointItem';

class PointList extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="points-container">
	      <h1>Points</h1>
				<table>
					<tbody>
						<tr>
							<th>Remove</th>
							<th>X</th>
							<th>Y</th>
						</tr>
						{this.props.squares.map((point, i) =>
							<PointItem onRemoveClick={this.props.onRemoveClick} key={i} index={i} point={point} />
			      )}
					</tbody>
				</table>
	    </div>
		)
	}
}

export default PointList;

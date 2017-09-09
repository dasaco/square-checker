import React, { Component } from 'react';
import SquareItem from './squareItem/squareItem';

class SquareList extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<table className="table">
					<thead>
						<tr>
							<th>p1</th>
							<th>p2</th>
							<th>p3</th>
							<th>p4</th>
						</tr>
					</thead>
					<tbody>
						{this.props.squarePoints.map((square, i) =>
							<SquareItem key={i} index={i} square={square} />
			      )}
					</tbody>
				</table>
	    </div>
		)
	}
}

export default SquareList;

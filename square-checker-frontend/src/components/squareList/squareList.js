import React, { Component } from 'react';
import SquareItem from './squareItem/squareItem';

class PointList extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="squares-container">
	      <h1>Squares</h1>
				<table>
					<tbody>
						<tr>
							<th>Points</th>
						</tr>
						{this.props.squares.map((square, i) =>
							<SquareItem key={i} index={i} square={square} />
			      )}
					</tbody>
				</table>
	    </div>
		)
	}
}

export default PointList;

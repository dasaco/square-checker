import React, { Component } from 'react';

import './frontpage.scss';
import '../../utils/calculations';
import io from 'socket.io-client';

import Points from 'components/points/points';
import SquareList from 'components/squareList/squareList';

class Frontpage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			points: [],
			squaresFound: 0,
			squarePoints: [],
			endpoint: 'http://127.0.0.1:3001'
		};

		this.onPointAdd = this.onPointAdd.bind(this);
		this.onRemovePoint = this.onRemovePoint.bind(this);
		this.onLoadFromFileClicked = this.onLoadFromFileClicked.bind(this);
		this.onFindSquaresClicked = this.onFindSquaresClicked.bind(this);
		this.onClearPointsClicked = this.onClearPointsClicked.bind(this);
	}

	onPointAdd(x, y) {
		this.setState({
		  points: this.state.points.concat([{x, y}])
		})
	}

	onRemovePoint(index) {
		this.setState({
        points: this.state.points.filter(function (e, i) {
        return i !== index;
      })
    });
	}

	onFindSquaresClicked() {
		const { endpoint, points } = this.state;
		const socket = io(endpoint);
		socket.emit('CountSquares', points, data => {
			this.setState({squarePoints: data.squarePoints})
			console.log(data.squarePoints);
		});
	}

	componentDidMount() {
		const { endpoint } = this.state;
		const socket = io(endpoint);
		socket.on("SquareFound", data => console.log(data.text));
	}

	onLoadFromFileClicked() {
		const { endpoint } = this.state;
		const socket = io(endpoint);
		socket.emit('GetFromFile', data => this.setState({points: data.pointsArray}));
	}

	onClearPointsClicked() {
		this.setState({points: []});
	}

	render() {
	  return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-6" align="center">

						<div className="col-md-10 col-md-offset-1">

							<div className="panel panel-default">
								<div className="panel-heading">
									Options
								</div>
								<div className="panel-body options">
									<button className="btn btn-default" onClick={this.onLoadFromFileClicked} type="button">Load from file</button>
									<button className="btn btn-danger" onClick={this.onClearPointsClicked} type="button">Clear all points</button>
								</div>
							</div>
			    		<Points onRemovePoint={this.onRemovePoint} onPointAdd={this.onPointAdd} points={this.state.points} />
						</div>
					</div>
					<div className="col-md-6">
						<div className="col-md-10 col-md-offset-1">
							<div className="panel panel-default">
								<div className="panel-heading">
									Square processing
								</div>
								<div className="panel-body">
									<button className="btn btn-default" onClick={this.onFindSquaresClicked} type="button"><span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Find squares</button>
								</div>
							</div>
							<div className="panel panel-default">
								<div className="panel-heading">
									Squares
								</div>
								<div className="panel-body">
									<SquareList squarePoints={this.state.squarePoints} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	  );
	}
}

export default Frontpage;

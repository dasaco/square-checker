import React, { Component } from 'react';

import './frontpage.scss';
import '../../utils/calculations';
import io from 'socket.io-client';

import Points from 'components/points/points';
import SquareList from 'components/squareList/squareList';
import AlertContainer from 'react-alert';

class Frontpage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			points: [],
			squaresFound: 0,
			squarePoints: [],
			endpoint: 'http://127.0.0.1:3001',
			isLoading: false
		};

		this.onPointAdd = this.onPointAdd.bind(this);
		this.onRemovePoint = this.onRemovePoint.bind(this);
		this.onLoadFromFileClicked = this.onLoadFromFileClicked.bind(this);
		this.onFindSquaresClicked = this.onFindSquaresClicked.bind(this);
		this.onClearPointsClicked = this.onClearPointsClicked.bind(this);
		this.onSaveToFileClicked = this.onSaveToFileClicked.bind(this);
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
		this.setState({isLoading: true});
		this.showInfo('Looking for squares started...');
		socket.emit('CountSquares', points, data => {
			this.setState({squarePoints: data.squarePoints})
			console.log(data.squarePoints);
			this.setState({isLoading: false});
			this.showSucess('Squares searching process finished!');
		});
	}

	componentDidMount() {
		const { endpoint } = this.state;
		const socket = io(endpoint);
		socket.on("SquareFound", data => console.log(data.text));

		const alertOptions = {
	    offset: 14,
	    position: 'bottom left',
	    theme: 'dark',
	    time: 5000,
	    transition: 'scale'
	  }
	}

	onLoadFromFileClicked() {
		const { endpoint } = this.state;
		const socket = io(endpoint);
		socket.emit('GetFromFile', data => {
			this.setState({points: data.pointsArray});
			this.showSucess('Points were loaded from file succesfully!');
		});
	}

	onClearPointsClicked() {
		this.setState({
			points: [],
			squarePoints: []
		});
		this.showSucess('All points were cleared!');
	}

	onSaveToFileClicked() {
		const { endpoint, points } = this.state;
		const socket = io(endpoint);
		socket.emit('SaveToFile', points, data => {
			this.showSucess('Saved to file!');
		});
	}

	showSucess = (message) => {
		this.msg.show(message, {
			time: 2000,
			type: 'success'
		})
	}

	showInfo = (message) => {
		this.msg.show(message, {
			time: 2000,
			type: 'info'
		})
	}

	render() {
	  return (
			<div className="container-fluid">
				<AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
				<div className="row">
					<div className="col-md-6" align="center">

						<div className="col-md-10 col-md-offset-1">

							<div className="panel panel-default">
								<div className="panel-heading">
									Options
								</div>
								<div className="panel-body options">
									<button className="btn btn-default" onClick={this.onLoadFromFileClicked} type="button">Load from file</button>
									<button className="btn btn-success" onClick={this.onSaveToFileClicked} type="button">Save to file</button>
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
									<button className="btn btn-default" onClick={this.onFindSquaresClicked} type="button">
										{ this.state.isLoading ? (<span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>) : '' }
											Find squares</button>
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

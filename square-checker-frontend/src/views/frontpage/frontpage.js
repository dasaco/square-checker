import React, { Component } from 'react';

import './frontpage.scss';
import '../../utils/calculations';
import io from 'socket.io-client';

import Points from 'components/points/points';
import SquareList from 'components/squareList/squareList';
import FileList from 'components/fileList/fileList';
import AlertContainer from 'react-alert';

class Frontpage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			points: [],
			squaresFound: 0,
			squarePoints: [],
			endpoint: 'http://127.0.0.1:3001',
			isLoading: false,
			files: []
		};

		this.onPointAdd = this.onPointAdd.bind(this);
		this.onRemovePoint = this.onRemovePoint.bind(this);
		this.onLoadFromFileClicked = this.onLoadFromFileClicked.bind(this);
		this.onFindSquaresClicked = this.onFindSquaresClicked.bind(this);
		this.onClearPointsClicked = this.onClearPointsClicked.bind(this);
		this.onFileSaveClicked = this.onFileSaveClicked.bind(this);
		this.onDeleteFileClicked = this.onDeleteFileClicked.bind(this);
		this.onFileRefreshClicked = this.onFileRefreshClicked.bind(this);
	}

	onPointAdd(x, y) {
		const { points } = this.state;

		if (points.filter(function(point) { return point.x == x && point.y == y; }).length > 0) {
		  this.showInfo('Point already exists!');
		} else if(points.length >= 10000) {
			this.showInfo('List already contains 10000 points');
		} else {
			this.setState({
			  points: this.state.points.concat([{x, y}])
			});
		}
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
			if(data.duplicates) this.showInfo('WARNING: Duplicates were found!');
		});
	}

	componentDidMount() {
		const alertOptions = {
	    offset: 14,
	    position: 'bottom left',
	    theme: 'dark',
	    time: 5000,
	    transition: 'scale'
	  }

		const { endpoint } = this.state;
		const socket = io(endpoint);
		socket.on('FilesLoaded', data => {
			this.setState({files: data.filesArray});
		});
		socket.emit('RefreshFileList', () => this.showSucess('Files refreshed'));
	}

	onDeleteFileClicked(fileName) {
		const { endpoint } = this.state;
		const socket = io(endpoint);
		socket.emit('DeleteFile', fileName, data => {
			this.setState({files: data});
		});
	}

	onLoadFromFileClicked(fileName) {
		const { endpoint, points } = this.state;
		const socket = io(endpoint);
		socket.emit('GetFromFile', { fileName, currentPoints: points }, data => {
			this.setState({
				points: data.pointsArray
			});
			if(data.cut) {
				this.showInfo('Points were cut to not exceed 10000');
			}
			if(data.invalidNumbers) {
				this.showInfo('There were invalid numbers in the file, but they were ignored');
			}
			if(data.duplicates) {
				this.showInfo('There were duplicates, but they were ignored');
			}
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

	onFileSaveClicked(fileName) {
		const { endpoint, points } = this.state;
		const socket = io(endpoint);
		socket.emit('SaveToFile', points, fileName, data => {
			this.showSucess('Saved to file!');
			this.setState({files: data});
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

	onFileRefreshClicked() {
		const { endpoint, points } = this.state;
		const socket = io(endpoint);
		socket.emit('RefreshFileList', () => this.showSucess('Files refreshed'));
	}

	render() {
	  return (
			<div className="container-fluid">
				<AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
				<div className="row">
					<div className="col-md-6">

						<div className="col-md-10 col-md-offset-1">

							<div className="panel panel-default">
								<div className="panel-heading">
									Files
								</div>
								<div className="panel-body options">
									<FileList onFileRefreshClicked={this.onFileRefreshClicked} onDeleteFileClicked={this.onDeleteFileClicked} onFileSaveClicked={this.onFileSaveClicked} onLoadFromFileClicked={this.onLoadFromFileClicked} files={this.state.files} />
								</div>
							</div>

							<div className="panel panel-default">
								<div className="panel-heading">
									Options
								</div>
								<div className="panel-body options">
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

import React, { Component } from 'react';

import './frontpage.scss';
import '../../utils/calculations';
import Points from 'components/points/points';
import io from 'socket.io-client';
import axios from 'axios';

class Frontpage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			points: [],
			squaresFound: 0,
			endpoint: 'http://127.0.0.1:3001'
		};

		this.onPointAdd = this.onPointAdd.bind(this);
		this.onRemovePoint = this.onRemovePoint.bind(this);
		this.onLoadFromFileClicked = this.onLoadFromFileClicked.bind(this);
		this.onFindSquaresClicked = this.onFindSquaresClicked.bind(this);
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
		//axios.post(endpoint + '/squares/render-points', { points });
		socket.emit('CountSquares', points);
	}

	componentDidMount() {
		const { endpoint } = this.state;
		const socket = io(endpoint);
		socket.on("SquareFound", console.log('ssssss'));
	}

	onLoadFromFileClicked() {
		const { endpoint } = this.state;
		axios.get(endpoint + '/squares/get-from-file')
			.then(res => {
				this.setState({points: res.data});
			});
	}

	render() {
	  return (
			<div>
	    	<Points onRemovePoint={this.onRemovePoint} onPointAdd={this.onPointAdd} points={this.state.points} />
				<button onClick={this.onLoadFromFileClicked} type="button">Load from file</button>
				<button onClick={this.onFindSquaresClicked} type="button">Find squares</button>
			</div>
	  );
	}
}

export default Frontpage;

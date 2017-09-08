import React, { Component } from 'react';

import './frontpage.scss';
import '../../utils/calculations';
import Points from 'components/points/points';

class Frontpage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			squares: [],
			response: false,
      		endpoint: "http://127.0.0.1:3001"
		};

		this.onPointAdd = this.onPointAdd.bind(this);
		this.onRemovePoint = this.onRemovePoint.bind(this);
	}

	onPointAdd(x, y) {
		this.setState({
		  squares: this.state.squares.concat([{x, y}])
		})
	}

	onRemovePoint(index) {
		this.setState({
        squares: this.state.squares.filter(function (e, i) {
        return i !== index;
      })
    });
	}

	componentDidMount() {
		const { endpoint } = this.state;
	    const socket = socketIOClient(endpoint);
	    socket.on("FromAPI", data => this.setState({ response: data }));
	}

	render() {
	  return (
	    <Points onRemovePoint={this.onRemovePoint} onPointAdd={this.onPointAdd} squares={this.state.squares} />
	  );
	}
}

export default Frontpage;

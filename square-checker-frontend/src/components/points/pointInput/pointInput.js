import React, { Component } from 'react';
import AlertContainer from 'react-alert';

import './pointInput.scss';
import { isNumeric } from '../../../helpers/helpers';

class PointInput extends Component {

	constructor(props) {
		super(props);

		this.state = {
			x: '',
			y: ''
		};

		this.onXChanged = this.onXChanged.bind(this);
		this.onYChanged = this.onYChanged.bind(this);
		this.addPoint = this.addPoint.bind(this);
	}

	componentDidMount() {
		const alertOptions = {
	    offset: 14,
	    position: 'bottom left',
	    theme: 'dark',
	    time: 5000,
	    transition: 'scale'
	  }
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

	onXChanged(evt) {
		this.setState({x: evt.target.value});
	}

	onYChanged(evt) {
		this.setState({y: evt.target.value});
	}

	addPoint(evt) {
		evt.preventDefault();
		const { x, y } = this.state;

		if(x < -5000 || x > 5000 || y < -5000 || y > 5000 || !isNumeric(x) || !isNumeric(y)) {
			this.showInfo('Point values are not valid');
			return false;
		} else {
			this.props.onPointAdd(Math.round(x * 100) / 100, Math.round(x * 100) / 100);
			this.setState({x: '', y: ''});
		}
	}

	render() {
		return (
			<div>
				<AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
				<form className="pointform" onSubmit={this.addPoint}>
					<div className="row">
						<div className="col-md-5">
							<div className="form-group">
								<label htmlFor="x">X:</label>
								<input autoComplete="off" id="x" className="form-control" type="text" value={this.state.x} onChange={this.onXChanged} />
							</div>
						</div>
						<div className="col-md-5">
							<div className="form-group">
								<label htmlFor="y">Y:</label>
								<input autoComplete="off" id="y" className="form-control" type="text" value={this.state.y} onChange={this.onYChanged} />
							</div>
						</div>
						<div className="col-md-2">
							<input className="pointform__submit-btn btn btn-success" type="submit" value="Add" />
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default PointInput;

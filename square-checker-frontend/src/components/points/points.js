import React, { Component } from 'react';

import PointList from './pointList/pointList';
import PointInput from './pointInput/pointInput';

class Points extends Component {

  constructor(props) {
    super(props);

    this.onPointAdd = this.onPointAdd.bind(this);
  }

  onPointAdd(x, y) {
    this.props.onPointAdd(x, y);
  }

  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <p>Add new point</p>
          </div>
          <div className="panel-body">
						<p>Point cannot be above 5000 and below -5000. It can ony contain numbers.</p>
            <PointInput onPointAdd={this.props.onPointAdd} />
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
						Points (Length: { this.props.points.length })
					</div>
          <div className="panel-body">
            <PointList onRemoveClick={this.props.onRemovePoint} points={this.props.points} />
          </div>
        </div>
      </div>
    );
  }
}

export default Points;

import React, { Component } from 'react';

import PointItem from './pointItem/pointItem';

class PointList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      itemsPerPage: 5,
    };

    this.onPageClicked = this.onPageClicked.bind(this);
    this.onShowChange = this.onShowChange.bind(this);
  }

  onPageClicked(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  onShowChange(event) {
    this.setState({
      itemsPerPage: event.target.value,
    });
  }

  render() {
    const { currentPage, itemsPerPage } = this.state;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = this.props.points.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.points.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => (
      <li>
        <a key={number} id={number} onClick={this.onPageClicked}>{number}</a>
      </li>
      ));

    return (
      <div>
        <div className="text-right">
          <div>
            <label htmlFor="sel1">Show:</label>
            <select onChange={this.onShowChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>X</th>
              <th>Y</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {currentItems.map((point, i) =>
              (<PointItem
                onRemoveClick={this.props.onRemoveClick}
                key={i}
                index={i}
                point={point}
              />),
        )}
          </tbody>
        </table>
        <div className="text-center">
          <ul className="pagination">
            { renderPageNumbers }
          </ul>
        </div>
      </div>
    );
  }
}

export default PointList;

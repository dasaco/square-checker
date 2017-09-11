import React, { Component } from 'react';
import SquareItem from './squareItem/squareItem';

class SquareList extends Component {

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
    const currentItems = this.props.squarePoints.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.squarePoints.length / itemsPerPage); i++) {
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
              <th>Point 1</th>
              <th>Point 2</th>
              <th>Point 3</th>
              <th>Point 4</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((square, i) =>
              <SquareItem key={i} index={i} square={square} />,
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

export default SquareList;

/* eslint-disable jsx-a11y/img-redundant-alt */
//
//
import React, { Component } from 'react';
import RentalCard from '../components/rental/RentalCard';

import connect from '../store/connect';

class RentalHome extends Component {
  state = {
    rentals: [],
  };

  componentDidMount() {
    const { rentals } = this.props;
    this.setState({
      rentals: rentals(),
    });
  }

  renderRentals = (rentals) =>
    rentals.map((rental) => (
      <div key={rental._id} className="col-md-3">
        <RentalCard rental={rental} />
      </div>
    ));

  render() {
    const { rentals } = this.state;
    return (
      <div className="card-list">
        <div>
          <h1 className="page-title">Your Home All Around the World</h1>
          <div className="row">{this.renderRentals(rentals)}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rentals: state.rentals,
  };
};

export default connect(RentalHome, mapStateToProps);

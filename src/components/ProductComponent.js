'use strict';
import React, { Component } from 'react';

require('styles/Product.css');

class ProductComponent extends Component {
  constructor() {
    super();
    //bind class methods to context
    this.formatDate = this.formatDate.bind(this);
    this.addDays = this.addDays.bind(this);
    this.addWorkingDays = this.addWorkingDays.bind(this);
    this.shipDate = this.shipDate.bind(this);
  }
  formatDate(date) {
    //helper method to format Javascript date objects
    let options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  }
  addDays(days, start = Date.now()) {
    //add specific days to Javascript Date object
    let dayInSeconds = (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/);
    return this.formatDate(new Date(start + (dayInSeconds * days)));
  }
  addWorkingDays(date, days) {
    //calculate working days to add from starting date
    let count = 0;
    while (count < days) {
      date.setDate(date.getDate() + 1);
      //exclude Saturdays and Sundays
      if (date.getDay() != 0 && date.getDay() != 6) {
        count++;
      }
    }
    return this.formatDate(date);
  }
  shipDate(days, weekend, current = new Date()) {
    //calculate shipping dates based on relevance of weekend days
    let startDay = (days - 1);
    if (!weekend) {
      return this.addWorkingDays(current, startDay);
    } else {
      return this.addDays(startDay);
    }
  }
  render() {
    return (
      //create product tile to display appropriate data
      <div className="product-component">
        <h5>{this.props.data.productName}</h5>
        <p>Items Available: <span>{this.props.data.inventoryQuantity}</span></p>
        <p>Order today and receive it by:</p>
        <p>{this.shipDate(this.props.data.maxBusinessDaysToShip, this.props.data.shipOnWeekends)}</p>
        <p>*ships within {this.props.data.maxBusinessDaysToShip} days {this.props.data.shipOnWeekends === true ? 'including' : 'excluding'} weekends</p>
      </div>
    );
  }
}

ProductComponent.displayName = 'SrcComponentsProductComponent';

//define proptypes to validate data
ProductComponent.propTypes = {
  data: React.PropTypes.shape({
    productId: React.PropTypes.number,
    productName: React.PropTypes.string,
    inventoryQuantity: React.PropTypes.number,
    shipOnWeekends: React.PropTypes.booleam,
    maxBusinessDaysToShip: React.PropTypes.number
  })
}

//Added default props for shallow rendering in tests
ProductComponent.defaultProps = {
  data: {
    productId: 99,
    productName: 'testing',
    inventoryQuantity: 99,
    shipOnWeekends: false,
    maxBusinessDaysToShip: 99
  }
};

export default ProductComponent;

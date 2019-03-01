require('normalize.css/normalize.css');
require('styles/App.css');

import React, { Component } from 'react';
import ProductComponent from './ProductComponent';

class AppComponent extends Component {
  constructor() {
    super();
    //initialize app state
    this.state = { data: [] };
  }
  componentWillMount() {
    //access api data for products
    fetch('https://itrellis-codechallenge20190301021553.azurewebsites.net/api/products')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }
  render() {
    return (
      <div className="index">
        {
          //iterate over available products creating a tile for each
          this.state.data.map((product, i) => {
            return <ProductComponent key={i} data={product} />
          })
        }
      </div>
    );
  }
}

export default AppComponent;

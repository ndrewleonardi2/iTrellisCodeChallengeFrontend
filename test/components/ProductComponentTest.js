/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';
import ProductComponent from 'components/ProductComponent.js';

describe('ProductComponent', () => {
  let product,
    shipDate;

  beforeEach(() => {
    shipDate = new ProductComponent().shipDate;
    product = createComponent(ProductComponent);
  });

  it('should NOT skip weekends when items are shippable on weekends', () => {
    expect(shipDate(4, true, new Date('03/01/2019'))).to.equal('March 4, 2019');
  });
  it('should SKIP weekends when items are NOT shippable on weekends', () => {
    expect(shipDate(4, false, new Date('03/01/2019'))).to.equal('March 6, 2019');
  });
  it('should CUMULATIVELY SKIP weekends when items are NOT shippable on weekends and will ship in 7 days or more', () => {
    expect(shipDate(15, true, new Date('03/01/2019'))).to.equal('March 15, 2019');
  });
  it('should NOT SKIP weekends when items are shippable on weekends and will ship in 7 days or more', () => {
    expect(shipDate(15, false, new Date('03/01/2019'))).to.equal('March 21, 2019');
  });
  it('should render the correct HTML elements withing the component', () => {
    expect(product.type).to.equal('div');
    expect(product.props.children.map((el) => el.type)).to.have.members(['h5', 'p', 'p', 'p', 'p']);
  });

});

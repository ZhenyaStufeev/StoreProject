import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Product from "shop/components/Products/Products";
class Products extends Component {
  render() {
    return (
      <div>
        <Product/>
      </div>
    );
  }
}

export default Products;

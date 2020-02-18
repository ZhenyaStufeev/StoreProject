import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Product from "shop/components/Products/Products";
import Paginate from "shop/components/Paginate/Paginate";

class Products extends Component {
  render() {
    return (
      <div>
        <Product />
        <hr />
        <Paginate/>
      </div>
    );
  }
}

export default Products;

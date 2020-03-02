import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ProductWithPaginate from "shop/components/Products/Products";
import Paginate from "shop/components/Paginate/Paginate";
import Filter from "shop/components/Filter/Filter";
import { connect } from "react-redux";
import { TryOpenFilters } from "utils/storecontrol";

class Products extends Component {
  render() {
    let filterItem = (
      <div>
        <hr />
        <button
          type="button"
          class="btn btn-outline-secondary"
          onClick={e => this.props.TryOpenFilters()}
        >
          Фильтр
        </button>
      </div>
    );
    return (
      <div className="product-view-container container">
        <div className="head-product">
          <h3>
            <b>{this.props.categoryName}</b>
          </h3>
          {window.innerWidth <= 991 ? filterItem : ""}
        </div>
        <div className="fluid-container view">
          {window.innerWidth >= 991 ? <Filter /> : ""}
          <ProductWithPaginate />
        </div>
      </div>
    );
  }
}

const mapStateProps = state => {
  return {
    categoryName: state.productReducer.currentCategoryName
  };
};

export default connect(mapStateProps, { TryOpenFilters })(Products);

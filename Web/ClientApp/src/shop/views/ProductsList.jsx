import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ProductWithPaginate from "shop/components/Products/Products";
import Paginate from "shop/components/Paginate/Paginate";
import Filter from "shop/components/Filter/Filter";
import { connect } from "react-redux";
import { TryOpenFilters, loadProducts, ChangeOrderType } from "utils/storecontrol";
import Select from 'react-select';

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.changeSelect = this.changeSelect.bind(this);
    this.state = {
      options: [
        { value: 'default', label: 'По умолчанию' },
        { value: 'lowtohight', label: 'Сортировать от дешёвых к дорогим' },
        { value: 'highttolow', label: 'Сортировать от дорогих к дешёвым' }
      ]
    };
  }

  changeSelect = (e) =>
  {
    console.log(e.value);
    const data = this.props;
    window.location.hash = "1";
    this.props.ChangeOrderType(e.value);
    this.props.loadProducts(data.selectedFilters, data.currentMinPrice, data.currentMaxPrice, e.value)
  }

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
          <div className="cd-sort">
            <Select options={this.state.options} defaultValue={this.state.options[0]} onChange={this.changeSelect}></Select>
          </div>
        </div>
        <div className="fluid-container view">
          {window.innerWidth >= 992 ? <Filter /> : ""}
          <ProductWithPaginate />
        </div>
      </div>
    );
  }
}

const mapStateProps = state => {
  return {
    categoryName: state.productReducer.currentCategoryName,
    loadedFilters: state.productReducer.loadedFilters,
    isOpen: state.elementsReducer.filterIsOpen,
    currentMaxPrice: state.productReducer.currentMaxPrice,
    currentMinPrice: state.productReducer.currentMinPrice,
    orderType: state.productReducer.orderType,
    selectedFilters: state.productReducer.selectedFilters
  };
};

export default connect(mapStateProps, { TryOpenFilters, loadProducts, ChangeOrderType })(ProductsList);

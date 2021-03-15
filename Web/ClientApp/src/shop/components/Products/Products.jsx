import React, { Component } from "react";
import { NavLink, Link, Switch, Route } from "react-router-dom";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import {
  loadProducts,
  loadFilters,
  updateCategoryName,
  AddIdToCart,
  loadCart,
  SetDataToCart
} from "utils/storecontrol";
import { getCategoryNameById } from "utils/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Paginate from "shop/components/Paginate/Paginate";
import Axios from "axios";
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      filtersLoaded: false
    };

    this.renderItems = this.renderItems.bind(this);
    this.updateData = this.updateData.bind(this);
    this.getCurrentProduct = this.getCurrentProduct.bind(this);
  }

  getCurrentProduct = (id) => {
    let host = window.location.origin;
    let requestHref = host + "/api/Store/AddProductsToCart";
    let model = {
      Email:  window.localStorage.getItem("Email"),
      productsIds: [id]
    }
    Axios.post(requestHref, model).then(res => {
      console.log(res);
      let result = res.data.data.map(item => {
        return {
          id : item.id,
          name : item.name,
          price : item.price,
          imagePath: item.imagePath,
          orderQuantity: 1
        }
      });
      this.props.SetDataToCart(result);
    });
  };

  updateData = () => {
    if (this.state.isLoading === false) {
      this.setState({ isLoading: true });
      this.props.loadProducts(
        this.props.selectedFilters,
        this.props.currentMinPrice,
        this.props.currentMaxPrice,
        this.props.orderType
      );
      let filtersLoaded = this.state.filtersLoaded;
      if (filtersLoaded === false) {
        this.props.loadFilters();
        filtersLoaded = true;
      }
      this.setState({ isLoading: false, filtersIsLoaded: filtersLoaded });
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.categoryList.length > 0) {
      let categoryname = getCategoryNameById(
        this.props.categoryId,
        this.props.categoryList
      );
      if (categoryname != null && categoryname.length > 0)
        this.props.updateCategoryName(categoryname);
    }
    if (
      prevProps.location.search !== this.props.history.location.search ||
      prevProps.location.hash !== this.props.history.location.hash
    ) {
      this.updateData();
    }
  }

  componentDidMount = async e => {
    this.updateData();
  };

  renderItems = () => {
    let content = [];
    let products = this.props.productList;
    products.forEach((item, i) => {
      content.push(
        <li className="product-wrapper" key={i}>
          <div className="product-item">
            <Link to={"sproduct?" + item.id}>
              <div className="product-photo">
                <img
                  src={item.imagePath}
                  alt="ASP.NET"
                  className="img-responsive"
                />
              </div>
            </Link>
            <div className="product-list">
              <Link to={"sproduct?" + item.id}>
                <p style={{ color: "black" }}>{item.name}</p>
              </Link>
              <span className="price">{item.price} грн</span>
              <button
                onClick={e => {
                  this.getCurrentProduct(item.id);
                }}
                className="item-button"
              >
                В корзину
              </button>
            </div>
            <div className="more-info"></div>
          </div>
        </li>
      );
    });
    return content;
  };

  render() {
    return (
      <div style={{width:"100%"}}>
        <div className={this.state.isLoading === true ? "--open-side" : ""} />
        <ol className="products" style={{ marginRight: "10px" }}>
          {this.renderItems()}
        </ol>
        <div>
          <hr className="hr-horizontal-line" />
          <Paginate />
        </div>
      </div>
    );
  }
}

// export default Products;
const mapStateProps = state => {
  return {
    productList: state.productReducer.productList,
    categoryId: state.productReducer.categoryId,
    categoryList: state.productReducer.categoryList,
    currentCategoryName: state.productReducer.currentCategoryName,
    orderType: state.productReducer.orderType,
    currentMaxPrice: state.productReducer.currentMaxPrice,
    currentMinPrice: state.productReducer.currentMinPrice,
    selectedFilters: state.productReducer.selectedFilters,
    // prIds: state.cartReducer.prIds
  };
};

export default withRouter(
  connect(mapStateProps, {
    loadProducts,
    loadFilters,
    updateCategoryName,
    AddIdToCart,
    loadCart,
    SetDataToCart
  })(Products)
);

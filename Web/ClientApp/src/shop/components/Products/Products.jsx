import React, { Component } from "react";
import { NavLink, Link, Switch, Route } from "react-router-dom";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { loadProducts } from "utils/storecontrol";
import { connect } from "react-redux";
import { withRouter } from "react-router";
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // productList:[],
      isLoading: false,
      needUpdate: false
    };

    this.renderItems = this.renderItems.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  updateData = () =>
  {
    if (this.state.isLoading === false) {
      this.setState({ isLoading: true });
      let hash = window.location.hash.slice(1);
      if(hash === "" || hash == null)
        hash = '1';
      this.props.loadProducts(window.location.search.slice(1),hash);
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate(prevProps)
  {
    if(prevProps.location.search !== this.props.history.location.search || prevProps.location.hash !== this.props.history.location.hash)
    {
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
            <div className="product-photo">
              <img
                src={item.imagePath}
                alt="ASP.NET"
                className="img-responsive"
              />
            </div>
            <div className="product-list">
              <p>{item.name}</p>
              <span className="price">{item.price}</span>
              <button href="" className="item-button">
                В корзину
              </button>
            </div>
          </div>
        </li>
      );
    });
    return content;
  };

  render() {
    return (
      <div>
        <ol className="products" style={{ marginRight: "10px" }}>
          {this.renderItems()}
        </ol>
      </div>
    );
  }
}

// export default Products;
const mapStateProps = state => {
  return {
    productList: state.productReducer.data,
    categoryId:state.productReducer.categoryId
  };
};

export default withRouter(connect(mapStateProps, { loadProducts })(Products));

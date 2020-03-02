import React, { Component } from "react";
import { NavLink, Link, Switch, Route } from "react-router-dom";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { loadProducts, loadFilters, updateCategoryName } from "utils/storecontrol";
import { getCategoryNameById } from "utils/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Paginate from "shop/components/Paginate/Paginate";
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      filtersLoaded: false
    };

    this.renderItems = this.renderItems.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  updateData = () =>
  {
    if (this.state.isLoading === false) {
      this.setState({ isLoading: true });
      this.props.loadProducts(this.state.selectedFilters);
      let filtersLoaded = this.state.filtersLoaded;
      if(filtersLoaded === false)
      {
        this.props.loadFilters();
        filtersLoaded = true;
      }
      this.setState({ isLoading: false, filtersIsLoaded: filtersLoaded });
    }
  }

  componentDidUpdate(prevProps)
  {  
    if(this.props.categoryList.length > 0)
    {
      let categoryname = getCategoryNameById(this.props.categoryId, this.props.categoryList);
      if(categoryname != null && categoryname.length > 0)
        this.props.updateCategoryName(categoryname);
    }
    if((prevProps.location.search !== this.props.history.location.search || prevProps.location.hash !== this.props.history.location.hash))
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
              <span className="price">{item.price} грн</span>
              <button href="" className="item-button">
                В корзину
              </button>
            </div>
            <div className="more-info">
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
        <div className={this.state.isLoading === true ? "--open-side" : ""}/>
        {this.props.selectedFilters}
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
    categoryId:state.productReducer.categoryId,
    categoryList: state.productReducer.categoryList,
    currentCategoryName: state.productReducer.currentCategoryName
  };
};

export default withRouter(connect(mapStateProps, { loadProducts, loadFilters, updateCategoryName })(Products));

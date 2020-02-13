import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { loadProductsByCategoryId } from "utils/actions";
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
        productList:[],
        isLoading:false
    };

    this.renderItems = this.renderItems.bind(this);
  }

  componentDidMount=async(e)=>
  {
      console.log(window.location);
    if (this.state.isLoading === false) {
        this.setState({ isLoading: true });
        if (this.state.productList.length === 0) {
          let dataResult = await loadProductsByCategoryId(32).then(res => {
            if (res.status === 200) {
              return res.data;
            }
          });
          this.setState({ productList: dataResult, isLoading: false });
        }
      }
  }

  renderItems = () =>
  {
    let content = [];
    let products = this.state.productList;
    products.forEach((item, i) => {
      content.push(<li className="product-wrapper" key={i}>
        <div className="product-item">
          <div className="product-photo">
            <img src={item.imagePath} alt="ASP.NET" className="img-responsive" />
          </div>
          <div className="product-list">
            <h3>{item.name}</h3>
            <span className="price">{item.price}</span>
            <button href="" className="item-button">
              В корзину
            </button>
          </div>
        </div>
      </li>)
    });
    return content;
  }

  render() {
    return (
      <div>
        <ol className="products clearfix" style={{ marginRight: "10px" }}>
          {this.renderItems()}
        </ol>
      </div>
    );
  }
}

export default Products;

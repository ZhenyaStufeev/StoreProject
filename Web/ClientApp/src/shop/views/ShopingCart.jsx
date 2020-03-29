import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ProductWithPaginate from "shop/components/Products/Products";
import Paginate from "shop/components/Paginate/Paginate";
import Filter from "shop/components/Filter/Filter";
import Nova from "shop/api/components/nova";
import { connect } from "react-redux";
import {
  TryOpenFilters,
  loadProducts,
  ChangeOrderType,
  SetDataToCart,
  UpdateOroductQuantity
} from "utils/storecontrol";
import Select from "react-select";
import Axios from "axios";

class ShopingCart extends Component {
  constructor(props) {
    super(props);
    this.getCurrentProduct = this.getCurrentProduct.bind(this);
    this.countChange = this.countChange.bind(this);
    this.state = {
      totalPrice: 0
    };
  }

  componentDidMount = () => {
    this.getCurrentProduct();
  };

  getCurrentProduct = () => {
    let host = window.location.origin;
    let requestHref = host + "/api/Store/AddProductsToCart";
    let model = {
      Email:  window.localStorage.getItem("Email"),
      productsIds: this.props.selectedIds
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
  renderItems() {}

  countChange = (id, value) =>
  {
    if(value < 1 || isNaN(value))
      value = 1;
    this.props.UpdateOroductQuantity(id, value);
  }

  render() {
    let del = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={25}
        viewBox="-1 -1 18 18"
        fill="none"
        id="remove-filter-hover"
        x={555}
        y={880}
      >
        <path
          d="M8 16c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8zM8 1.067A6.941 6.941 0 0 1 14.933 8 6.941 6.941 0 0 1 8 14.933 6.941 6.941 0 0 1 1.067 8 6.941 6.941 0 0 1 8 1.067zm-3.24 9.418L7.247 8 4.76 5.515l.754-.754L8 7.246l2.485-2.485.754.754L8.754 8l2.485 2.485-.754.754L8 8.754 5.515 11.24l-.754-.754z"
          fill="#ff8585"
        />
      </svg>
    );

    return (
      <div className="shoping-cart-main container">
        <h2>Корзина покупок</h2>
        <div className="cart-items">
           {this.props.cartList.map((item,index) => {
             
            return (
              <div className="cart-item" key={index}>
                <div className="cart-del-bt">{del}</div>
                <div className="cart-content">
                  <img src={item.imagePath} className="img-responsive"></img>
                  <div className="cart-t">
                    <h4>{item.name}</h4>
                    <div className="cart-price">
                      <p>{item.price} грн</p>
                    </div>
                  </div>
                  <div className="cart-dt">
                    <div className="cart-count">
                      <input
                        pattern="[0-9]"
                        style={{ width: "90px" }}
                        className="form-control"
                        value={item.orderQuantity}
                        type="number"
                        onChange = {e => this.countChange(item.id, e.target.value)}
                      />
                    </div>
                    <div className="cart-current-price">
                      <b>Сума: {item.price * item.orderQuantity} грн</b>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <h4 className="cart-total">
            <b>Итог: {this.props.total} грн</b>
          </h4>
        </div>
        {/* <button className="btn btn-success">Оплатить</button> */}
        <br />
        <Nova/>
        <br />
        <button className="btn btn-success">Подтвердить заказ</button>
        <br />
      </div>
    );
  }
}

const mapStateProps = state => {
  return {
    cartList: state.cartReducer.cartList,
    selectedIds: state.cartReducer.prIds,
    total: state.cartReducer.totalSum
  };
};

export default connect(mapStateProps, { SetDataToCart,UpdateOroductQuantity })(ShopingCart);
{
  /* <div className="cart-count">
<input
  className="form-control"
  defaultValue={2}
  type="number"
/>
</div>
<div className="cart-current-price">
<b>{this.state.price * 2} грн</b>
</div> */
}

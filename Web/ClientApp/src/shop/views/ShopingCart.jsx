import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ProductWithPaginate from "shop/components/Products/Products";
import Paginate from "shop/components/Paginate/Paginate";
import Filter from "shop/components/Filter/Filter";
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
      totalPrice: 0,
      optionsCity: [
        { value: "Ровно", label: "Ровно" },
        { value: "Киев", label: "Киев" },
        { value: "Харьков", label: "Харьков" },
        { value: "Одеса", label: "Одеса" },
        { value: "Львов", label: "Львов" },
        { value: "Олександрия", label: "Олександрия" },
        { value: "Ивано-Франкивск", label: "Ивано-Франкивск" },
        { value: "Луцьк", label: "Луцьк" },
        { value: "Ялта", label: "Ялта" }
      ],
      optionsSend: [
        {
          value: "1",
          label: "Отделение 1	ул. Князя Владимира, 109а До 1100 кг"
        },
        { value: "2", label: "Отделение 2	ул. Чорновола, 14/16 До 30 кг" },
        {
          value: "3",
          label:
            "Отделение 3	ул. Дубенская БОС, 1 (возле кафе 'Звёздочка') До 1000 кг"
        },
        { value: "4", label: "Отделение 4	ул. Видинская, 5в До 30 кг" },
        { value: "5", label: "Отделение 5	просп. Мира, 12 До 30 кг" },
        {
          value: "6",
          label: "Отделение 6	ул. Киевская, 44 (возле кафе Мономах) До 30 кг"
        },
        {
          value: "7",
          label: "Отделение 7	ул. Королева, 6 (авторынок 'Динамо') До 30 кг"
        },
        { value: "8", label: "Отделение 8	ул. Киевская, 21 До 30 кг" }
      ]
    };
  }

  componentDidMount = () => {
    this.getCurrentProduct();
  };

  getCurrentProduct = () => {
    let host = window.location.origin;
    let requestHref = host + "/api/Store/getproductstocart";
    Axios.post(requestHref, this.props.selectedIds).then(res => {
      // console.log(res);
      let result = res.data.map(item => {
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
                  <img src={item.imagePath} class="img-responsive"></img>
                  <div className="cart-t">
                    <h4>{item.name}</h4>
                    <div className="cart-price">
                      <p>{item.price} грн</p>
                    </div>
                  </div>
                  <div className="cart-dt">
                    <div className="cart-count">
                      <input
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
        <div className="pay-info">
          <div className="select-city">
            <label>Выберите ваш город: </label>
            <Select
              options={this.state.optionsCity}
              defaultValue={this.state.optionsCity[0]}
            ></Select>
          </div>
          <br />
          <div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                defaultValue="option1"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="exampleRadios1">
                Самовывоз из Новой Почты
              </label>
            </div>
          </div>
          <br />
          <div style={{ maxWidth: "350px" }}>
            <label>Выберите отдел получения: </label>
            <Select
              options={this.state.optionsSend}
              defaultValue={this.state.optionsSend[0]}
            ></Select>
          </div>
          <br />
          <div className="user-pay-info">
            <input
              className="form-control"
              placeholder="Номер телефона получателя"
            />
            <input className="form-control" placeholder="Ф.И.О получателя" />
          </div>
        </div>
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

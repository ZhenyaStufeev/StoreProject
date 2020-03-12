import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ProductWithPaginate from "shop/components/Products/Products";
import Paginate from "shop/components/Paginate/Paginate";
import Filter from "shop/components/Filter/Filter";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import {
  TryOpenFilters,
  loadProducts,
  ChangeOrderType
} from "utils/storecontrol";
import Select from "react-select";
import Axios from "axios";

class SelectedProduct extends Component {
  constructor(props) {
    super(props);
    this.getCurrentProduct = this.getCurrentProduct.bind(this);
    this.state = {
      id: "",
      name: "",
      price: "",
      description: "",
      imagePath: "",
      props: []
    };
  }

  componentDidMount = () => {
    this.getCurrentProduct();
  };

  getCurrentProduct = () => {
    let search = window.location.search.slice(1);
    let host = window.location.origin;
    let requestHref = host + "/api/Store/getproduct/" + search;
    Axios.get(requestHref).then(res => {
      this.setState({
        id: res.data.id,
        name: res.data.name,
        price: res.data.price,
        description: res.data.description,
        imagePath: res.data.imagePath,
        props: res.data.props
      });
    });
  };

  render() {
    return (
      <div className="main-pr-block">
        <div className="pr-header">
          <h2>{this.state.name}</h2>
        </div>
        <hr class="hr-horizontal-line" />
        <div className="pr-block">
          <img src={this.state.imagePath} className="spr-selected-image" />
          <div className="pr-info">
            <div className="price-block">
              5325 грн.
              <button className="btn btn-success pr-bt ">
                <div className="pe-7s-wallet" />В корзину
              </button>
            </div>
            <div className="pr-props">
            <ul>
              {this.state.props.map(p => {
                return (<li>
                    <div>
                        {p.name}:
                    </div>
                    <div>
                        {p.value}
                    </div>
                </li>)
              })}
            </ul>
          </div>
          </div>
        </div>
        <hr class="hr-horizontal-line" />
        <div className="pr-foo">
            <div className="pr-des">
                <p><b>Описание:</b></p>
                <p>{this.state.description}</p>
            </div>
            <div className="pr-dop-info">
                <div className="pr-garant">
                    <p><b>Гарантия</b></p>
                    <hr class="hr-horizontal-line" />
                    <div>
                        <p><b>14 дней</b></p>
                        <p>Продавец гарантирует упаковку заказанного товара, которая обеспечит целостность и сохранность его товарного вида</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

const mapStateProps = state => {
  return {};
};

export default connect(mapStateProps, {})(SelectedProduct);

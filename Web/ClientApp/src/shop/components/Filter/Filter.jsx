import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadFilters,
  loadProducts,
  TryOpenFilters,
  updateCurrentPrice
} from "utils/storecontrol";
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
const loadGif = (
  <img
    className="gif-loading"
    src={require("../../../images/loading.gif")}
    alt=""
  />
);
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedId: [],
      currentValue: [props.currentMinPrice, props.currentMaxPrice],
      minPrice: props.minPrice,
      maxPrice: props.maxPrice,
      isLoading: false
    };
    this.checkBoxOnClick = this.checkBoxOnClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.OnClick = this.OnClick.bind(this);
    this.OnChangeInputs = this.OnChangeInputs.bind(this);
    this.OnClickSetPrice = this.OnClickSetPrice.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.minPrice !== prevState.minPrice ||
      nextProps.maxPrice !== prevState.maxPrice
    )
      return {
        currentValue: [nextProps.minPrice, nextProps.maxPrice],
        minPrice: nextProps.minPrice,
        maxPrice: nextProps.maxPrice
      };

    return {
      currentValue: [nextProps.currentMinPrice, nextProps.currentMaxPrice]
    };
  }

  OpenOrHide(e) {
    if (e.target.className.includes("h4-clicked")) e.target.className = "";
    else e.target.className = "h4-clicked";

    let item = e.target.nextElementSibling;
    if (item != null) {
      let hi = item.className.includes("--hidden-items");
      let si = item.className.includes("--show-items");
      if (si === false && hi === false) {
        item.className += " --hidden-items";
      } else if (hi === true) {
        let temp = item.className.replace(" --hidden-items", " --show-items");
        item.className = temp;
      } else {
        let temp = item.className.replace(" --show-items", " --hidden-items");
        item.className = temp;
      }
    }
  }

  checkBoxOnClick = e => {
    this.setState({ isLoading: true });
    let ids = this.state.checkedId;
    if (e.target.checked == true) {
      ids.push(e.target.id);
    } else {
      ids.forEach((item, i) => {
        if (item == e.target.id) {
          ids.splice(i, 1);
        }
      });
    }
    window.location.hash = "1";
    this.props
      .loadProducts(
        ids,
        this.state.currentValue[0],
        this.state.currentValue[1],
        this.props.orderType
      )
      .then(() => this.setState({ isLoading: false }));
    this.setState({ checkedId: ids });
  };

  OnClickSetPrice() {
    this.setState({ isLoading: true });
    window.location.hash = "1";
    this.props
      .loadProducts(
        this.state.checkedId,
        this.state.currentValue[0],
        this.state.currentValue[1],
        this.props.orderType
      )
      .then(() => this.setState({ isLoading: false }));
  }

  OnClick() {
    this.props.TryOpenFilters(!this.props.isOpen);
  }

  handleChange(e, value) {
    this.props.updateCurrentPrice(value[0], value[1]);
  }

  OnChangeInputs(e) {
    let val = e.target.value;
    let range = this.state.currentValue;

    let parsedVal = parseInt(val);
    let selectNum = 0;

    if (parsedVal < 0 || isNaN(parsedVal)) {
      parsedVal = 0;
    }

    if (e.target.id === "max") selectNum = 1;

    if (parsedVal > this.state.maxPrice) range[selectNum] = this.state.maxPrice;
    else range[selectNum] = parsedVal;

    this.props.updateCurrentPrice(range[0], range[1]);
  }

  componentDidUpdate() {
    this.props.updateCurrentPrice(
      this.state.currentValue[0],
      this.state.currentValue[1]
    );
  }

  render() {
    // if (document.getElementById("gif-loading") == null) {
    //   var node = document.createElement("img");
    //   node.src = require("../../../images/loading.gif");
    //   node.className = "gif-loading";
    //   node.id = "gif-loading";
    //   document.body.appendChild(node);
    // }

    return (
      <div
        className={
          this.props.isOpen === true || window.innerWidth >= 992
            ? "main-div"
            : "main-div --hidden"
        }
        
      >
        {this.state.isLoading === true ? loadGif : ""}
        <div
          onClick={this.OnClick}
          className={
            this.props.isOpen === true && window.innerWidth <= 991
              ? "--open-side"
              : ""
          }
        ></div>
        <div style={{ position: "relative" }} className="body-style">
          <form className="local-content">
            <div className="local-form">
              <div className="filter-header">
                <font size="3">
                  <b>
                    <p>Подбор за параметрами: </p>
                  </b>
                </font>
                <button
                  type="button"
                  className="close with-wrapper"
                  onClick={this.OnClick}
                ></button>
              </div>
              <hr />
              <div>
                <div className="cd-filter-block">
                  <h4 className="">Диапазон цены</h4>
                  <div>
                    <Slider
                      style={{ color: "gray" }}
                      value={this.state.currentValue}
                      defaultValue={[0, 100000000]}
                      onChange={this.handleChange}
                      valueLabelDisplay="off"
                      aria-labelledby="range-slider"
                      max={this.props.maxPrice}
                      min={this.props.minPrice}
                    />
                    <div className="inputs-price">
                      <input
                        type="text"
                        pattern="[0-9]"
                        className="form-control"
                        id="min"
                        value={this.state.currentValue[0]}
                        onChange={this.OnChangeInputs}
                      ></input>
                      <i className="fa fa-minus" aria-hidden="true"></i>
                      <input
                        type="text"
                        pattern="[0-9]"
                        className="form-control"
                        value={this.state.currentValue[1]}
                        onChange={this.OnChangeInputs}
                        id="max"
                      ></input>
                      <button
                        type="button"
                        onClick={this.OnClickSetPrice}
                        className="btn btn-outline-secondary btn-price"
                      >
                        Ок
                      </button>
                    </div>
                  </div>
                </div>
                {this.props.loadedFilters.map((item, i) => {
                  return (
                    <div className="cd-filter-block" key={i}>
                      <h4 onClick={this.OpenOrHide} className="">
                        {item.name}
                      </h4>
                      <ul className="cd-filter-content cd-filters list">
                        {item.childrens.map((val, j) => {
                          return (
                            <li key={j}>
                              <input
                                onClick={this.checkBoxOnClick}
                                className="filter"
                                type="checkbox"
                                id={val.id}
                              />
                              <label
                                className="checkbox-label"
                                htmlFor={val.id}
                              >
                                {val.name}
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateProps = state => {
  return {
    loadedFilters: state.productReducer.loadedFilters,
    isOpen: state.elementsReducer.filterIsOpen,
    maxPrice: state.productReducer.maxPrice,
    minPrice: state.productReducer.minPrice,
    currentMaxPrice: state.productReducer.currentMaxPrice,
    currentMinPrice: state.productReducer.currentMinPrice,
    orderType: state.productReducer.orderType,
    selectedIds: state.productReducer.selectedFilters
  };
};

export default withRouter(
  connect(mapStateProps, {
    loadFilters,
    loadProducts,
    TryOpenFilters,
    updateCurrentPrice
  })(Filter)
);

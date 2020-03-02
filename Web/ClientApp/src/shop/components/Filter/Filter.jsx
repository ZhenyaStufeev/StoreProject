import React, { Component } from "react";
import { connect } from "react-redux";
import { loadFilters, loadProducts, TryOpenFilters } from "utils/storecontrol";
import { withRouter } from "react-router";
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedId: []
    };
    this.checkBoxOnClick = this.checkBoxOnClick.bind(this);
    this.OnClick = this.OnClick.bind(this);
  }

  OpenOrHide(e) {
    let hi = e.target.nextElementSibling.className.includes("--hidden-items");
    let si = e.target.nextElementSibling.className.includes("--show-items");
    if(si === false && hi === false)
    {
      e.target.nextElementSibling.className += " --hidden-items";
    }
    else
      if(hi === true)
      {
        let temp = e.target.nextElementSibling.className.replace(" --hidden-items", " --show-items");
        e.target.nextElementSibling.className = temp;
      }
      else
      {
        let temp = e.target.nextElementSibling.className.replace(" --show-items", " --hidden-items");
        e.target.nextElementSibling.className = temp;
      }
  }

  checkBoxOnClick = e => {
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
    window.location.hash="1";
    this.props.loadProducts(ids);
    this.setState({ checkedId: ids });
  };


  OnClick()
  {
    this.props.TryOpenFilters(!this.props.isOpen);
  }

  render() {
    return (
      <div className={this.props.isOpen === true || window.innerWidth >= 991  ? "main-div" : "main-div --hidden"}  >
        <div
          onClick={this.OnClick}
          className={this.props.isOpen === true && window.innerWidth <= 991 ? "--open-side" : ""}
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
                <button type="button"
                  className="close with-wrapper"
                  onClick={this.OnClick}
                ></button>
              </div>
              <hr />
              <div>
                {this.props.loadedFilters.map((item, i) => {
                  return (
                    <div className="cd-filter-block" key={i}>
                      <h4 onClick={this.OpenOrHide}>{item.name}</h4>
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
    isOpen: state.elementsReducer.filterIsOpen
  };
};

export default withRouter(
  connect(mapStateProps, { loadFilters, loadProducts, TryOpenFilters })(Filter)
);

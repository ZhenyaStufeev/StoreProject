import React, { Component, Page } from "react";
import { NavLink, Link, Redirect, Router, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { openSubMenu } from "utils/actions";
import { loadCategories } from "utils/storecontrol";
import { withRouter } from "react-router";
class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount()
  {
    if(this.props.listIsLoaded === false)
    {
      this.props.loadCategories();
    }
  }



  renderItems() {
    let renderList = this.props.categoryList.map(item => {
      return this.getItems(item);
    });

    return renderList;
  }

  getItems(item) {
    let htmlItem = null;
    if (item.childrens.length === 0) {
      let ref = "/products?" + item.id;
      let temp = (
          <li key={item.id}>
            <NavLink to={ref}>
              <p>{item.name}</p>
            </NavLink>
          </li>
      ); 
      htmlItem = temp
    } else {
      htmlItem = (
        <li className="sub-button" onClick={openSubMenu}>
          <p>
            {item.name}
            <span className="arrow right" />
          </p>
          <ul className="submenu">
            {
              item.childrens.map(child => {
                return this.getItems(child);
              })
            }
          </ul>
        </li>
      );
    }
    return htmlItem;
  }

  render() {
    
    return (
      <ul className="category-list">
        {this.renderItems()}
      </ul>
    );
  }
}
const mapStateProps = (state) => {
  return {
    listIsLoaded: state.categoryReducer.isLoaded,
    categoryList: state.categoryReducer.data
  };
}

export default withRouter(connect(mapStateProps,{ loadCategories })(CategoriesList));
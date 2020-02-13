import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import CategoriesList from "./CategoryList";
import {openSubMenu} from "utils/actions";
class Categories extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      
    };
  }

  render() {
    let mobile = (
      <li className="category-button" id="mobile-button" onClick={openSubMenu}>
        <NavLink to="#" onClick={(e) => {e.preventDefault()}}>Каталог товаров</NavLink>
        <CategoriesList width={this.props.width}/>
      </li>
    );

    let desktop = (
      <button id="desktop-button" className="category-button" onClick={this.openCategoryListMobile}>
        Каталог товаров
        <CategoriesList width={this.props.width}/>
      </button>
    );

    return this.props.width < 991 ? mobile : desktop;
  }
}

const mapStateProps = (state) => {
  console.log(state);
  return {
    isOpened: state.categoryReducer.categoryMobileIsOpened
  };
}
// export default connect(mapStateProps,{ UseCategoryMobile })(Categories);
export default Categories;
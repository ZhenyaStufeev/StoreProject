import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Categories from "../Categories/Category";
import { connect } from "react-redux";
import { ISLOG, ISREG } from "store/types";
import { openAuth } from "utils/storecontrol";
// import {closeSidebar} from "utils/actions";
import {resetMobileMenu, closeSidebar} from "utils/actions";
class ShopNavbarLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  OpenAuth(type)
  {
    resetMobileMenu();
    closeSidebar();
    this.props.openAuth(true, type);
  }

  render() {
    const notification = (
      <div className="">
        <i className="fa pe-7s-wallet" />
          {this.props.width >= 991 && this.props.orderItems > 0 ? <span className="notification">{this.props.orderItems}</span> : ""} 
        <span className="notification-text">Корзина</span>
      </div>
    );
    return (
      
      <div>
        <Nav>
          <Categories {...this.props} />
        </Nav>

        <ul className="nav navbar-nav navbar-right">
          <li role="presentation"><NavLink className="shoping-catr" to="/shopingcart">{notification}</NavLink></li>
          <NavDropdown
            eventKey={2}
            title="Личный кабинет"
            id="basic-nav-dropdown-right"
          >
            <MenuItem onClick={e => this.OpenAuth(ISLOG)}>Авторизация</MenuItem>
            <MenuItem onClick={e => this.OpenAuth(ISREG)}>Регистрация</MenuItem>
          </NavDropdown>
        </ul>
      </div>
    );
  }
}
const mapStateProps = state => {
  return {
    orderItems: state.cartReducer.itemsCount
  };
};

export default connect(mapStateProps, { openAuth })(ShopNavbarLinks);

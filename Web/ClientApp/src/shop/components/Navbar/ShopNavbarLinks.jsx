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
    return (
      <div>
        <Nav>
          <Categories {...this.props} />
        </Nav>

        <Nav pullRight>
          <NavDropdown
            eventKey={2}
            title="Личный кабинет"
            id="basic-nav-dropdown-right"
          >
            <MenuItem onClick={e => this.OpenAuth(ISLOG)}>Авторизация</MenuItem>
            <MenuItem onClick={e => this.OpenAuth(ISREG)}>Регистрация</MenuItem>
          </NavDropdown>
        </Nav>
      </div>
    );
  }
}
const mapStateProps = state => {
  return {};
};

export default connect(mapStateProps, { openAuth })(ShopNavbarLinks);

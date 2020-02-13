import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Categories from "../Categories/Category";

class ShopNavbarLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <Nav>
          <Categories {...this.props}/>
        </Nav>

        <Nav pullRight>
          <NavItem>Test</NavItem>
        </Nav>
      </div>
    );
  }
}

export default ShopNavbarLinks;

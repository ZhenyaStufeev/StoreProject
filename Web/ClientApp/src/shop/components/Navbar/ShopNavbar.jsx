import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

import ShopNavbarLinks from "./ShopNavbarLinks.jsx";
import {resetMobileMenu} from "utils/actions";
class Header extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false
    };
  }

  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open-mobile");
    var node = document.createElement("div");
    node.id = "bodyClick-mobile";
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open-mobile");
    };
    document.body.appendChild(node);
  }

  render() {
    return (
      <Navbar fluid style={{paddingLeft:"20px", paddingRight:"20px"}}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#pablo">{this.props.brandText}</a>
          </Navbar.Brand>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>
        <Navbar.Collapse>
          <ShopNavbarLinks {...this.props}/>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;

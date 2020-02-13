/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";

import { style } from "../variables/Variables.jsx";

import routes from "../routes.js";

import image from "assets/img/sidebar-3.jpg";
import ShopNavBar from "../components/Navbar/ShopNavbar.jsx";
import Main from "shop/views/Main.jsx";
import {resetMobileMenu} from "utils/actions";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      image: "",
      color: "light",
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open",
      width: window.innerWidth,
      mobileIsOpened:false
    };
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentDidUpdate(e) {
    let bodyClickItem = document.getElementById("bodyClick-mobile");
    if(((e.history.location.pathname !== e.location.pathname) || this.state.width >= 991) && bodyClickItem != null)
    {  
        resetMobileMenu();
        bodyClickItem.onclick();
    }

    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open-mobile") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open-mobile");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  render() {

    return (
      <div className="wrapper">
        <div id="--open" className=""/>
        <Sidebar
          {...this.props}
          width={this.state.width}
          routes={routes}
          image={this.state.image}
          color={this.state.color}
          hasImage={this.state.hasImage}
        />

        <div className="main-shop" id="main-panel" ref="mainPanel">
          <ShopNavBar width={this.state.width} {...this.props}/>
          <div> {/*body components*/}
            {this.props.history.location.pathname === "/" ? <Main /> : ""}
            <Switch>{this.getRoutes(routes)}</Switch>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Shop;

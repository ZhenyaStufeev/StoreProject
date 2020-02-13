import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import ShopNavbarLinks from "../Navbar/ShopNavbarLinks.jsx";
import logo from "assets/img/logo3.png";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1;
  }

  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + this.props.image + ")",
      borderRadius:"50px"
    };

    return (
      <div
        id="sidebar"
        className="sidebar sidebar-mobile"
        data-color={this.props.color}
        data-image={this.props.image}
      >
        {this.props.hasImage ? (
          <div className="sidebar-background" style={sidebarBackground} />
        ) : null}
        <div className="logo">
          <Link
            to="/"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="logo_image" style={{width:"34px", height:"34px", margin:"0"}}/>
            </div>
          </Link>
          <Link to="/"
            className="simple-text logo-normal"
          >
            Store
          </Link>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {/* {this.props.routes.map((prop, key) => {
              
              if (!prop.redirect)
                return (
                  <li key={key}>
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              return null;
            })} */}
            {/* <div className="line" /> */}
            <ShopNavbarLinks {...this.props} />
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;

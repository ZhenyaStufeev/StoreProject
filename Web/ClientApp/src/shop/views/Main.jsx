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
import { Grid, Row, Col } from "react-bootstrap";
import Axios from "axios";

class Main extends Component {
  send() {
    Axios.post("https://localhost:44330/api/Account/login", {
      Email: "zhenyastufeev09012001@gmail.com",
      Password: "fdgdfhgdfg",
      ConfirmPassword: "gsdfgfdg"
    });
  }

  reg()
  {
    Axios.post("https://localhost:44330/api/Account/register", {
      Email: "zhenyastufeev09012001@gmail.com",
      Password: "fdgdfhgdfg",
      ConfirmPassword: "gsdfgfdg"
    });
  }
  render() {
    return (
      <div className="">
        <button onClick={this.send}>Login</button>
      </div>
    );
  }
}

export default Main;

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
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import "./assets/css/styles.css";
import "./assets/css/border-items.css";

import AdminLayout from "admin/layouts/Admin.jsx";
import ShopLayout from "shop/layouts/Shop.jsx";
import Main from 'shop/views/Main.jsx';
import { Provider } from "react-redux";
import rootReducer from "store/rootReducer.jsx"

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />

        <Route path="/" render={props => <ShopLayout {...props} />} />
        {/* <Route render={props => <Main {...props} />} />   */}
        {/* <Redirect from="/" to="/admin/dashboard" />  document.title = this.props.total; якщо адмінка*/}

        {/* <Redirect from="/" to="/shop/index" /> */}
      </Switch>
    </Provider>

  </BrowserRouter>,
  document.getElementById("root")
);

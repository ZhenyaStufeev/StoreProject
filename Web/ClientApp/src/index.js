import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import "./assets/css/styles.css";
import "./assets/css/border-items.css";

import AdminLayout from "admin/layouts/Admin.jsx";
import ShopLayout from "shop/layouts/Shop.jsx";
import { Provider } from "react-redux";
import rootReducer from "store/rootReducer.jsx"
import {setAuthorizationToken} from "utils/setAuthorizationToken.jsx";
import {Change_Lang } from "utils/actions";
import {loadCart} from "utils/storecontrol"
import Axios from "axios";
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

store.dispatch(Change_Lang());
if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
}
store.dispatch(loadCart());

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/" render={props => <ShopLayout {...props} />} />
      </Switch>
    </Provider>

  </BrowserRouter>,
  document.getElementById("root")
);

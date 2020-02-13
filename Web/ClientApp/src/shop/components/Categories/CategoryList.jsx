import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { openSubMenu } from "utils/actions";
import { loadCategories } from "utils/actions";
import Axios from "axios";

class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesList: [],
      isLoading: false
    };
    this.loadCategories = this.loadCategories.bind(this);
  }

  componentDidMount = async () => {
    await this.loadCategories();
  };

  loadCategories = async () => {
    if (this.state.isLoading === false) {
      this.setState({ isLoading: true });
      if (this.state.categoriesList.length === 0) {
        let dataResult = await loadCategories().then(res => {
          if (res.status === 200) {
            return res.data;
          }
        });
        this.setState({ categoriesList: dataResult, isLoading: false });
      }
    }
  };

  renderItems() {
    let renderList = this.state.categoriesList.map(item => {
      return this.getItems(item);
    });

    return renderList;
  }

  getItems(item) {
    let htmlItem = null;

    if (item.childrens.length === 0) {
      let ref = "/products?" + item.id;
      htmlItem = (
        <li key={item.Id}>
          <NavLink to={ref}>
            <p>{item.name}</p>
          </NavLink>
        </li>
      );
    } else {
      htmlItem = (
        <li className="sub-button" onClick={openSubMenu}>
          <p>
            {item.name}
            <span className="arrow right" />
          </p>
          <ul className="submenu">
            {
              item.childrens.map(child => {
                return this.getItems(child);
              })
            }
          </ul>
        </li>
      );
    }
    return htmlItem;
  }

  render() {
    
    return (
      <ul className="category-list">
        {this.renderItems()}
      </ul>
    );
  }
}
// const mapStateProps = (state) => {
//   console.log(state);
//   return {
//     isOpened: state.categoryReducer.categoryMobileIsOpened
//   };
// }

// export default connect(mapStateProps,{ loadCategories })(CategoriesList);
export default CategoriesList;

{
  /* <ul className="category-list submenu">
<li>Шини</li>
<li>Диски</li>
</ul> */
}

import Axios from "axios";
import { CHANGEOUTPUT,
   GETCATEGORY,
    LOADFILTERS,
     UPDATECURRENTCATEGORY,
      TRYOPENFILTER,
       CHANGERORDERTYPE,
        CHANGECURRENTPRICE,
        SETTOCART,
        SETIDSPRODUCTS,
        ADDID,
        UPDATEQUANTITY,
         CONTROLAUTH } from "store/types.jsx";
import {getData} from './actions';

export function loadCategories() {
  let host = window.location.origin;
  let requestHref = host + "/api/Store/getcategories";
  return function(dispatch) {
    return Axios.get(requestHref).then(result => {
      if (result.status === 200) {
        dispatch({
          type: GETCATEGORY,
          data: { list: result.data, isLoaded: true }
        });
      }
    });
  };
}

export function loadProducts(filtersid, minPrice, maxPrice, orderType) {
  let host = window.location.origin;

  let requestHref = host + "/api/Store/getproducts";
  let data = getData();
  return function(dispatch) {
    return Axios.post(requestHref, {
      categoryid: data.categoryId,
      page: data.page,
      filtersId: filtersid,
      minPrice,
      maxPrice,
      orderType
    }).then(result => {

      if (result.status === 200) {
        dispatch({
          type: CHANGEOUTPUT,
          data: {
            list: result.data.dto,
            categoryId: data.categoryId,
            page: data.page,
            totalPages: result.data.totalPages,
            maxPrice: result.data.maxPrice,
            minPrice: result.data.minPrice,
            selectedFilters: filtersid,
            // currentMinPrice: result.data.minPrice,
            // currentMaxPrice: result.data.maxPrice
          }
        });
      }
    });
  };
}

export function loadFilters() {
  let host = window.location.origin;
  let categoryId = getData().categoryId;

  let requestHref = host + "/api/Store/getfiltersbycategoryid/" + categoryId;
  return function(dispatch) {
    return Axios.get(requestHref).then(result => {
      if (result.status === 200) {
        dispatch({
          type: LOADFILTERS,
          data: result.data
        });
      }
    });
  };
}

export function updateCategoryName(categoryName) {
  return function(dispatch) {
    return dispatch({
          type: UPDATECURRENTCATEGORY,
          data: categoryName
        });
      }
}

export function TryOpenFilters(isOpen) {
  return function(dispatch) {
    return dispatch({
          type: TRYOPENFILTER,
          data: isOpen
        });
      }
}

export function ChangeOrderType(orderType) {
  return function(dispatch) {
    return dispatch({
          type: CHANGERORDERTYPE,
          orderType: orderType
        });
      }
}

export function updateSelectedFilters(filtersId) {
  return function(dispatch) {
    return dispatch({
          type: UPDATECURRENTCATEGORY,
          data: filtersId
        });
      }
}

export function updateCurrentPrice(minPrice, maxPrice) {
  return function(dispatch) {
    return dispatch({
          type: CHANGECURRENTPRICE,
          currentMinPrice: minPrice,
          currentMaxPrice: maxPrice
        });
      }
}

export function openAuth(isOpen, typeAuth) {
  return function(dispatch) {
    return dispatch({
          type: CONTROLAUTH,
          typeAuth: typeAuth,
          authIsOpen: isOpen
        });
      }
}


export function SetDataToCart(items) {
  return function(dispatch) {
    return dispatch({
          type: SETTOCART,
          cartList: items
        });
      }
}

export function SetProductsIds(ids) {
  return function(dispatch) {
    return dispatch({
          type: SETIDSPRODUCTS,
          prIds: ids
        });
      }
}

export function AddIdToCart(id)
{
  return function(dispatch) {
    return dispatch({
          type: ADDID,
          Id:id
        });
      }
}


export function UpdateOroductQuantity(id, value)
{
  return function(dispatch) {
    return dispatch({
          type: UPDATEQUANTITY,
          id:id,
          value: value
        });
      }
}
/* --------------------------------------------------------- */

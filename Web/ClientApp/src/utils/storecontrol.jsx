import Axios from "axios";
import { CHANGEOUTPUT, GETCATEGORY, LOADFILTERS, UPDATECURRENTCATEGORY, TRYOPENFILTER } from "store/types.jsx";
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

export function loadProducts(filtersid) {
  let host = window.location.origin;
  let requestHref = host + "/api/Store/getproducts";
  let data = getData();
  return function(dispatch) {
    return Axios.post(requestHref, {
      categoryid: data.categoryId,
      page: data.page,
      filtersId: filtersid
    }).then(result => {
      if (result.status === 200) {
        dispatch({
          type: CHANGEOUTPUT,
          data: {
            list: result.data.dto,
            categoryId: data.categoryId,
            page: data.page,
            totalPages: result.data.totalPages
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

/* --------------------------------------------------------- */

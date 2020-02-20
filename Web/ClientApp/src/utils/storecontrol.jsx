import Axios from "axios";
import { CHANGEOUTPUT, GETCATEGORY } from "store/types.jsx";

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

export function loadProducts(categoryId, page) {
  let host = window.location.origin;
  // let filtersid = [];
  let requestHref = host + "/api/Store/getproducts/" + categoryId + "/" + page;
  return function(dispatch) {
    return Axios.get(requestHref).then(result => {
      console.log(result);
      if (result.status === 200) {
        dispatch({
          type: CHANGEOUTPUT,
          data: {list: result.data.dto, categoryId: categoryId, page:page, totalPages: result.data.totalPages}
        });
      }
    });
  };
}

// export function updateProducts() {
//   let categoryId = ;
//   return function(dispatch) {
//     return dispatch({
//           type: GETCATEGORY,
//           data: { categoryId:categoryId }
//         });
      
//       }
// }


/* --------------------------------------------------------- */

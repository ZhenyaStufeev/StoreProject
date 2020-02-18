import { combineReducers } from "redux";
import categoryReducer from './categoryReducer';
import productReducer from './productsReducer';
export default combineReducers({
    categoryReducer,
    productReducer,
});
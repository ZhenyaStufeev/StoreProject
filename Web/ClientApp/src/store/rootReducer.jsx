import { combineReducers } from "redux";
import productReducer from './productsReducer';
import elementsReducer from './elementsReducer';
import accountReducer from './accountReducer';
export default combineReducers({
    productReducer,
    elementsReducer,
    accountReducer
});
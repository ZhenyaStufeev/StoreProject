import { combineReducers } from "redux";
import productReducer from './productsReducer';
import elementsReducer from './elementsReducer';
export default combineReducers({
    productReducer,
    elementsReducer
});
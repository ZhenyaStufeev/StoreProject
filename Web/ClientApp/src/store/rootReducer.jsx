import { combineReducers } from "redux";
import productReducer from './productsReducer';
import elementsReducer from './elementsReducer';
import accountReducer from './accountReducer';
import cartReducer from './cartReducer';
import langReducer from './langReducer';
export default combineReducers({
    productReducer,
    elementsReducer,
    accountReducer,
    cartReducer,
    langReducer
});
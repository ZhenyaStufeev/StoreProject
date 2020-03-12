import { CHANGEOUTPUT, LOADFILTERS, GETCATEGORY, UPDATECURRENTCATEGORY, CHANGERORDERTYPE, CHANGECURRENTPRICE } from "./types.jsx";

const initialState = {
    productList: [],
    categoryList: [],
    loadedFilters: [],
    selectedFilters: [],
    page: 1,
    totalPages: 0,
    categoryId: '',
    categoriesIsLoaded: false,
    currentCategoryName: "",
    maxPrice: 0,
    minPrice: 0,
    orderType: "default",
    currentMinPrice: 0,
    currentMaxPrice: 0
}

export default function UpdateProducts(state = initialState, action={})
{
    switch(action.type)
    {
        case CHANGEOUTPUT:
        {
            return Object.assign({}, state, 
            {
                categoryId: action.data.categoryId,
                page:action.data.page,
                productList: action.data.list,
                totalPages: action.data.totalPages,
                minPrice: action.data.minPrice,
                maxPrice: action.data.maxPrice,
                selectedFilters: action.data.selectedFilters,
                // currentMinPrice: action.data.currentMinPrice,
                // currentMaxPrice: action.data.currentMaxPrice
            });
        }
        case LOADFILTERS:
        {
            return Object.assign({}, state, {loadedFilters: action.data});
        }
        case GETCATEGORY:
        {
            return Object.assign({}, state, {categoryList: action.data.list, categoriesIsLoaded: true });
        }
        case UPDATECURRENTCATEGORY:
        {
            return Object.assign({}, state, { currentCategoryName: action.data });
        }
        case CHANGERORDERTYPE:
        {
            return Object.assign({}, state, { orderType:  action.orderType == null ? "default": action.orderType});
        }
        case CHANGECURRENTPRICE: 
        {
            return Object.assign({}, state, { currentMinPrice: action.currentMinPrice, currentMaxPrice: action.currentMaxPrice});
        }
        default:
        {
            return state;
        }
    }
}
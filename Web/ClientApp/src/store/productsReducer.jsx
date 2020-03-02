import { CHANGEOUTPUT, LOADFILTERS, GETCATEGORY, UPDATECURRENTCATEGORY } from "./types.jsx";

const initialState = {
    productList: [],
    categoryList: [],
    loadedFilters: [],
    page: 1,
    totalPages: 0,
    categoryId: '',
    categoriesIsLoaded: false,
    currentCategoryName: ""
}

export default function UpdateProducts(state = initialState, action={})
{
    switch(action.type)
    {
        case CHANGEOUTPUT:
        {
            return Object.assign({}, state, {categoryId: action.data.categoryId, page:action.data.page, productList: action.data.list, totalPages: action.data.totalPages});
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
        default:
        {
            return state;
        }
    }
}
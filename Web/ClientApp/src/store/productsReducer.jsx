import { CHANGEOUTPUT } from "./types.jsx";

const initialState = {
    data: [],
    categoryId: "",
    page: "",
    totalPages: 0
}

export default function UpdateProducts(state = initialState, action={})
{
    switch(action.type)
    {
        // case CHANGEOUTPUT:
        // {
        //     return Object.assign({}, state, { data: action.data });
        // }
        case CHANGEOUTPUT:
        {
            return Object.assign({}, state, {categoryId: action.data.categoryId, page:action.data.page, data: action.data.list, totalPages: action.data.totalPages});
        }
        default:
        {
            return state;
        }
    }
}
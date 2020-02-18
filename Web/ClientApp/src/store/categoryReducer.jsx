import { GETCATEGORY } from "./types.jsx";

const initialState = {
    data: [],
    isLoaded: false
}

export default function OpenOrCloseCategoryMobile(state = initialState, action={})
{
    switch(action.type)
    {
        case GETCATEGORY:
        {
            return Object.assign({}, state, {data: action.data.list, isLoaded: true});
        }
        default:
        {
            return state;
        }
    }
}
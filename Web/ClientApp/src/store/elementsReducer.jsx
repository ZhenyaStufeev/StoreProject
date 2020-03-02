import { TRYOPENFILTER } from "./types.jsx";

const initialState = {
    filterIsOpen: false,
    openSide: false
}

export default function UpdateElements(state = initialState, action={})
{
    switch(action.type)
    {
        case TRYOPENFILTER:
        {
            let data = action.data;
            if(data == null)
                data = true;
            return Object.assign({}, state, {filterIsOpen: data});
        }
        default:
        {
            return state;
        }
    }
}
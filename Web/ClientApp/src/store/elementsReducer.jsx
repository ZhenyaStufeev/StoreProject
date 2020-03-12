import { TRYOPENFILTER, CONTROLAUTH } from "./types.jsx";

const initialState = {
    filterIsOpen: false,
    openSide: false,
    typeAuth: "",
    authIsOpen: false

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
        case CONTROLAUTH:
        {
            return Object.assign({}, state, {typeAuth:action.typeAuth, authIsOpen: action.authIsOpen});
        }
        default:
        {
            return state;
        }
    }
}
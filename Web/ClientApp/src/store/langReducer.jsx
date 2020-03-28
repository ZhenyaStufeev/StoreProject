import { CHANGE_LANG } from "store/types";
import Language_initial from "../resources/Language_initial.json";

const initialState = {
    resource_name: "",
    lang: ""
}

export default function Change_Lang(state = initialState, action = {}) {
    switch (action.type) {
        case CHANGE_LANG:
            {
                let default_language = window.navigator.language;
                let interpr = Language_initial[(default_language)];

                const dt = action.data;
                let result = '';
                if (dt != null) {
                    result = action.data.lang;
                }
                else {
                    if (localStorage.lang != null) {
                        result = localStorage.lang;
                    }
                    else {
                        if(interpr == null)
                        {
                            interpr = "US";
                        }
                        result = interpr;
                    }
                }
                localStorage.lang = result;
                let temp = {};
                temp = {lang: result};
                return Object.assign({}, state, temp);
            }
        default:
            {
                return state;
            }
    }
}




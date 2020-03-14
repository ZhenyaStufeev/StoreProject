import { SETTOCART, DELETEOUTCART, SETCOUNTPRODUCTCART, SETIDSPRODUCTS, ADDID, UPDATEQUANTITY } from "./types.jsx";

const initialState = {
    cartList: [],
    totalSum: 0,
    city: "",
    typeSend: "",
    FIO: "",
    phoneNumber: "",
    itemsCount: 0,
    prIds: []
}

function calcTotalSum(data)
{
    let totalSum = 0;
    if(data != null)
    for(let i = 0; i < data.length; i++)
    {
        totalSum += (data[i].price * data[i].orderQuantity);
    }
    return totalSum;
}

export default function UpdateElements(state = initialState, action={})
{
    switch(action.type)
    {
        case SETTOCART:
        {
            let items = [];
            let count = 0;
            if(action.cartList != null)
            {
                items = action.cartList;
                count = action.cartList.length;
            }
            return Object.assign({}, state, { cartList:items, itemsCount: count, totalSum:calcTotalSum(items) });
        }
        case SETIDSPRODUCTS:
        {
            if(action.prIds != null)
                return Object.assign({}, state, { prIds:action.prIds, itemsCount: action.prIds.length });
            return state;
        }
        case ADDID:
        {
            let item = action.Id.toString();
            if(item != null)
            {
                let access = true;
                for(let i = 0; i < state.prIds.length; i++)
                {
                    if(item === state.prIds[i])
                    {
                        access = false;
                    }
                }
                if(access)
                {
                    let newList = [].concat(state.prIds);
                    newList.push(item);
                    return Object.assign({}, state, { prIds:newList, itemsCount: newList.length });
                }
            }
            return state;
        }
        case UPDATEQUANTITY:
        {
            let data = [].concat(state.cartList);
            for(let i = 0; i < data.length; i++)
            {
              if(data[i].id === action.id)
              {
                data[i].orderQuantity = parseInt(action.value, 10);
                break;
              }
            }

            let total = calcTotalSum(data);
            return Object.assign({}, state, { cartList:data, totalSum: total });
        }
        default:
        {
            return state;
        }
    }
}
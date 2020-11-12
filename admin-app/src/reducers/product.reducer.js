import { productConstants } from "../actions/components";
const initialState={
    products:[]
}
export default function(state = initialState, action) {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCT_SUCCESS:
        state={
            ...state,
            products:action.payload.product
        }
        break;
    // case productConstants.get
     
    default:
      return state;
  }
  return state
}
import { productConstants } from "../actions/components";
import { getProductBySlug } from "../actions/product.action";
const initialState={
    products:[],
    ProductByPrice:{
        under5k:[],
        under10k:[],
        under15k:[],
        under20k:[],
        under25k:[],
        under30k:[],
    }
}
export default function(state = initialState, action) {
  switch (action.type) {
    case productConstants.GET_PRODUCT_BY_SLUG:

      return {
        ...state,
        products:action.payload.products,
        ProductByPrice:{
            ...action.payload.ProductByPrice
        }
        
      };
     
    default:
      return state;
  }
}
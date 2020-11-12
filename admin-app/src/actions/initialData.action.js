import { categoryConstants, productConstants } from "./components";
import axios from "../helpers/axios"


export const initialData=()=>{
    return async dispatch=>{
        const res=await axios
          .get("initialData");
        //   console.log(res.data.product);
        if(res.status==200)
        {
            dispatch({
                type:productConstants.GET_ALL_PRODUCT_SUCCESS,
                payload:{product:res.data.product}
            })
            dispatch({
                type:categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload:{category:res.data.category}
            })
        }
    }
}
import axios from "../helpers/axios"
import { productConstants } from "./components";

export const getProductBySlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`/products/${slug}`);
        dispatch({
            type:productConstants.GET_PRODUCT_BY_SLUG,
            payload:res.data
        })
        console.log(res);
    }
}
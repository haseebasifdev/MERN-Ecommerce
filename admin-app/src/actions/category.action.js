import axios from "../helpers/axios"
import { categoryConstants } from "./components";
export const getAllCategory=()=>{
    return async dispatch=>{
        dispatch({type:categoryConstants.GET_ALL_CATEGORIES_REQUEST});
        const res=await axios
          .get("/category/getCategory");
          console.log(res)  ;
          if(res.status==200)
          {
              const {categoryList}=res.data
              dispatch({
                  type:categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                  payload:{category:categoryList}
              })
          }
          else{
              dispatch({
                  type:categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                  payload:{error:res.data.error}
                });
          }
    }
}
export const addCatgory=(form)=>{
    return async dispatch=>{
        dispatch({
            type:categoryConstants.ADD_NEW_CATEGORY_REQUEST
        })
        const res=await axios.post('/category/create',form)
        console.log(res);
        if(res.status==201)
        {

            dispatch({
                type:categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                payload:{category:res.data.category}
            })
        }
        else{
            dispatch({
                type:categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                payload:res.data.error
            })
        }
    }
}
export const UpdateCatgories=(form)=>{
    return async dispatch=>{
        dispatch({
            type:categoryConstants.ADD_NEW_CATEGORY_REQUEST
        })
        const res=await axios.post('/categories/update',form)
        if(res.status==200)
        {
            return true;
        }
        console.log(res);
        // if(res.status==201)
        // {
        //     console.log(res);
        //     // dispatch({
        //     //     type:categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
        //     //     payload:{category:res.data.category}
        //     // })
        // }
        // else{
        //     console.log(res);
        //     // dispatch({
        //     //     type:categoryConstants.ADD_NEW_CATEGORY_FAILURE,
        //     //     payload:res.data.error
        //     // })
        // }
    }
}



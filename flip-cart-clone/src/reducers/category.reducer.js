import { Children } from "react";
// import category from "../../../backend/src/model/category";
import { categoryConstants } from "../actions/components";

const initstate={
    categories:[],
    loading:false,
    error:null
}
const buildNewCategory=(categories,category)=>{
    let myCatgories=[]
    if(category.parentId==undefined)
    {
        return [
            ...categories,
            {
                ...category
            }
        ];
    }
    for(let cat of categories)
    {
        if(cat._id==category.parentId)
        {
            myCatgories.push({
                ...cat,
                children:cat.children ?buildNewCategory([
                    ...cat.children,
                    {...category
                }
                ],category):[]

            })
        }
        else{
            myCatgories.push({
                ...cat,
                children:cat.children ? buildNewCategory(cat.children,category):[]
            })
        }
        
    }
    return myCatgories;
}
export default (state=initstate,action)=>{
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            
            break;
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state={
                ...state,
                categories:action.payload.category
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state={
                ...initstate,
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            // const v=buildNewCategory(state.categories,action.payload.category)
            // console.log(v);
            const category=action.payload.category
            state={
                ...state,
                categories:buildNewCategory(state.categories,category),
                loading:false
            }
            break;
        default:
            break;
    }
    return state;
}
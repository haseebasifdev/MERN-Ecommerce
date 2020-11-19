import { combineReducers } from 'redux'
import categoryreducer from './category.reducer'
import productreducer from './product.reducer'

const rootReducer=combineReducers({
   
    category:categoryreducer,
    product:productreducer
})
export default rootReducer
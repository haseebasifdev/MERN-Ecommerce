import { combineReducers } from 'redux'
import categoryreducer from './category.reducer'
const rootReducer=combineReducers({
   
    category:categoryreducer,
})
export default rootReducer
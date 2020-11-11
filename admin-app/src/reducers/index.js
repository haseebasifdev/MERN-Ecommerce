import { combineReducers } from 'redux'
import authReducer from './auth.reducer'
import userreducer from './user.reducer'
import categoryreducer from './category.reducer'
import orderreducer from './order.reducer'
import productreducer from './product.reducer'
const rootReducer=combineReducers({
    auth:authReducer,
    user:userreducer,
    order:orderreducer,
    category:categoryreducer,
    products:productreducer
})
export default rootReducer
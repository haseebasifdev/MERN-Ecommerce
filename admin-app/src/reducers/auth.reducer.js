import { authConstants } from "../actions/components";

const initialState = {
    token:null,
    user:{
        firstName:'',
        lastName:'',
        email:'',
        picture:''
    },
    authencate:false,
    authencating:false,
    loading:false,
    error:null,
    message:''
}
export default  (state = initialState, action)=> { 
    // return state
    console.log('from reducer hey',action)
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            {
                  state = {
                    ...state,
                    authencating:true

                };
                break;
            }
        case authConstants.LOGIN_SUCCESS:
            {
                 state = {
                    ...state,
                    user:action.payload.user,
                    token:action.payload.token,
                    authencate:true,authencating:false
                };
                break;
            }
        case authConstants.LOGOUT_REQUEST:{
              state={
                ...initialState
            }
            break;
        }
        case authConstants.LOGOUT_FAILURE:{
            state={
                ...state,
                loading:true
            }
            break;
        }
        case authConstants.LOGOUT_SUCCESS:{
            state={
                ...initialState,
                loading:false,
            }
            break;
        }
        case authConstants.LOGOUT_FAILURE:{
            state={
                ...state,
                loading:false,
                message:action.payload.error
            }
            break;
        }
        default:
             return state;
    }
    return state
}
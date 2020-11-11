import axios from "../helpers/axios"
import { authConstants } from "./components"

export const login = (userData) => {
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGIN_REQUEST });
        const res = await axios
            .post("/admin/signin", {
                ...userData
            })
        if (res.status == 200) {
            const { token, user } = res.data;
            localStorage.setItem('token', token)
            localStorage.setItem('user',JSON.stringify(user))

            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,user
                }
            })
        }
        else {
            if (res.status == 400) {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: {
                        error:res.data.error
                    }
                })
            }
        }

    }
}


export const isLoggedIn=()=>{
    return async dispatch=>{
        const token=localStorage.getItem('token')
        if(token)
        {
            const user=JSON.parse(localStorage.getItem('user'))
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,user
                }
            })
        }
        else
        {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error:'Failed to login'
                }
            })
        }
    }
}


export const sigout=()=>{
    console.log('came to Sigout Function');
    return async dispatch=>{
        dispatch({type:authConstants.LOGOUT_REQUEST})
        const res=await axios
          .post("/admin/signout");
        //   .then(res => )
        //   .catch(err => console.error(err));
        if(res.status==200)
        {
            localStorage.clear();
            dispatch({
                type:authConstants.LOGOUT_SUCCESS
            })
        }
        else
        {
            dispatch({
                type:authConstants.LOGOUT_FAILURE,
                payload:{error:res.data.error}
            })
        }
    }
}
import axios from "../helpers/axios"
import { authConstants, userConstants } from "./components"



export const signup = (userData) => {
    return async (dispatch) => {
        dispatch({ type: userConstants.USER_REGISTER_REQUEST });
        const res = await axios
            .post("/admin/signup", {
                ...userData
            })
        if (res.status == 200) {
            // const { token, user } = res.data;
            const {message} = res.data;
            // localStorage.setItem('token', token)
            // localStorage.setItem('user',JSON.stringify(user))

            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS,
                payload: {
                    message
                }
            })
        }
        else {
            if (res.status == 400) {
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload: {
                        error:res.data.error
                    }
                })
            }
        }

    }
}






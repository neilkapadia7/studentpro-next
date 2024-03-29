import * as AuthAction from '../../constants/actionTypes/auth';

export const userSignIn = (payload: any) => {
    return {
        type: AuthAction.USER_SIGNIN,
        payload
    }
}

export const userSignInResult = (payload: any) => {
    return {
        type: AuthAction.USER_SIGNIN_RESULT,
        payload: payload.data
    }
}

export const userSignUp = (payload: any) => {
    return {
        type: AuthAction.USER_SIGNUP,
        payload
    }
}

export const userSignUpResult = (payload: any) => {    
    return {
        type: AuthAction.USER_SIGNIN_RESULT,
        payload: payload.data
    }
}

// export const SET_PASSWORD = (payload: any) => {
//     return {
//         type: AuthAction.USER_DETAILS,
//         payload
//     }
// }

export const getUserDetailsTriggerSaga = () => {
    return {
        type: AuthAction.GET_USER_DETAILS,
    }
}

export const getUserDetails = () => {
    return {
        type: AuthAction.USER_DETAILS,
    }
}

export const getUserDetailsResult = (payload: any) => {
    return {
        type: AuthAction.USER_DETAILS_RESULT,
        payload
    }
}


export const logout = () => {
    return {
        type: AuthAction.USER_LOGOUT
    }
}

export const clearError = () => {
    return {
        type: AuthAction.CLEAR_ERROR,
        // payload
    }
}

export const setError = (payload: {status: boolean, message: String}) => {
    return {
        type: AuthAction.AUTH_ERROR,
        payload: payload.message
    }
}

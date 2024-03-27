import * as AuthAction from '../../constants/actionTypes/auth';

export const userSignIn = (payload: any) => {
    return {
        type: AuthAction.USER_SIGNIN,
        payload
    }
}

export const userSignUp = (payload: any) => {
    return {
        type: AuthAction.USER_SIGNUP,
        payload
    }
}

export const SET_PASSWORD = (payload: any) => {
    return {
        type: AuthAction.USER_DETAILS,
        payload
    }
}

export const getUserDetails = () => {
    return {
        type: AuthAction.USER_DETAILS,
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

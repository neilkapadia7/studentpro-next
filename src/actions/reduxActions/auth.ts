import * as AuthAction from '../../constants/actionTypes/auth';

export const userSignIn = (payload: any) => {
    console.log("userSignIn Action Called", payload);
    return {
        type: AuthAction.USER_SIGNIN,
        payload
    }
}

export const userSignInResult = (payload: any) => {
    console.log("userSignInResult Action Called", payload);

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

export const setError = (payload: {status: boolean, message: String}) => {
    return {
        type: AuthAction.AUTH_ERROR,
        payload: payload.message
    }
}

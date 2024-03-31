import {
    USER_SIGNIN,
    USER_SIGNIN_RESULT,
    AUTH_ERROR,
    CLEAR_ERROR,
    USER_LOGOUT,
    USER_SIGNUP_RESULT,
    USER_SIGNUP,
    USER_DETAILS,
    USER_DETAILS_RESULT,
    SET_PASSWORD,
    SET_PASSWORD_RESULT,
    GET_USER_DETAILS,
    SUBMIT_USER_PROFILE_BASIC_DETAILS,
    SUBMIT_USER_PROFILE_BASIC_DETAILS_RESULT,
    // FORGOT_PASSWORD,
    // FORGOT_PASSWORD_RESULT,
} from "../constants/actionTypes/auth";

    type action = {
        type: String,
        payload: any,
        message: String
    }
  
  const initialState = {
    authErrorMessage: "", 
    isError: false,
    isLoading: false,
    loggedIn: false,
    isFreeUser: false,
    id: "",
    email: "",
    mobile: "",
    name: "",
    isPremiumUser: false,
    referralCode: "",
	accessType: "",
	instituteDetails: [],
	isActive: true,
	isAdminUser: false,
	referredBy: null,
	expiryDate: null,
    token: "",
    isInstituteAccess: false,
  };
  
  const authReducer = (state = initialState, action: action) => {
    switch (action.type) {
        case USER_SIGNIN:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case GET_USER_DETAILS:
            return {
                isLoading: true,
                isError: false,
            }
        case USER_SIGNIN_RESULT:
            return {
                ...state,
                loggedIn: true,
                token: action.payload.token,
            }
        case USER_SIGNUP:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case USER_SIGNUP_RESULT:
            return {
                ...state,
                loggedIn: true,
                token: action.payload.token,
            }
        case USER_DETAILS:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case USER_DETAILS_RESULT:
            return {
                ...state,
                isLoading: false,
                loggedIn: true,
                isFreeUser: action.payload.isFreeUser,
                id: action.payload._id,
                email: action.payload.email,
                mobile: action.payload.mobile,
                name: action.payload.name,
                isPremiumUser: action.payload.isPremiumUser,
                referralCode: action.payload.referralCode,
                accessType: action.payload.accessType,
                instituteDetails: action.payload.instituteDetails,
                isActive: action.payload.isActive,
                isAdminUser: action.payload.isAdminUser,
            }
        case AUTH_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                authErrorMessage: action.payload
            }
        case SET_PASSWORD:
            return {
            ...state,
            isLoading: true,
            isError: false,
            message: "",
            };
        case SET_PASSWORD_RESULT:
            return {
            ...state,
            isLoading: false,
            message: action.payload.message,
            };

        case USER_LOGOUT:
            return {
                ...state,
                loggedIn: false,
            }
        case CLEAR_ERROR:
            return {
            ...state,
            isError: false,
            authErrorMessage: "",
            };
        
        
        default:
            return state;
    }
  };
  
  export default authReducer;
  
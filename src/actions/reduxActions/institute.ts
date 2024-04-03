import * as ACTION from '../../constants/actionTypes/institute';


export const updateInstituteDetails = (payload: any) => {
    return {
        type: ACTION.ADD_INSTITUTE_DETAILS,
        payload
    }
}
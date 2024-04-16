"use client";
import { useEffect } from "react";
import { getUserDetailsTriggerSaga } from "@/actions/reduxActions/auth";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/store/store';
import { Skeleton } from "@/components/ui/skeleton"
import { getAllBatch, getAllStudents, getAllInstituteUsers } from '@/actions/reduxActions/batchDetails';

export const CheckLoginUser = ({children}: { children: React.ReactNode}) => {
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if(localStorage.getItem('token')) {
          dispatch(getUserDetailsTriggerSaga());
        }
    }, []);


      // Get the User, Student  and Institute Details on Login
    useEffect(() => {
        if(auth.instituteId) {
            // setLoading(true);
            dispatch(getAllBatch());
            dispatch(getAllStudents());
            dispatch(getAllInstituteUsers());
        }
    }, [auth.loggedIn]);

    return (
        <Fragment>
            {children}
        </Fragment>
    )

}
"use client";
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {RootState} from "@/store/store";
import Loading from '@/components/layouts/Loading';

export const Loader = ({children}: Readonly<{children: React.ReactNode}>) => {
    const [loading, setLoading] = useState(true);
    const auth = useSelector((state: RootState) => state.auth);
    const batchDetails = useSelector((state: RootState) => state.batchDetails);

    useEffect(() => {
        if(auth.isLoadingg) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [auth.isLoading]);
  return (
    <>
        {loading ? 
                <Loading classes="pt-32 px-32" />
            : 
                <>
                {children}
                </>    
            }
    </>
  )
}

export default Loader;

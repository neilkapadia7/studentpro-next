"use client";
import React from 'react'
import { useSelector } from "react-redux";
import {RootState} from "@/store/store";
import { Button } from '@/components/ui/button';


const Home = () => {
    const auth = useSelector((state: RootState) => state.auth);
    
    return (
        <div>
            {!auth.instituteId && 
                <div className="text-center justify-center pt-32">
                    <h1 className="font-bold text-6xl text-center">You have not added an Institute yet. <br /> Please add your institute to proceed.</h1>
                    <Button className="mt-16 px-10 py-5 font-bold">Add Institute</Button>
                </ div>
            }

        </div>
    )
}

export default Home
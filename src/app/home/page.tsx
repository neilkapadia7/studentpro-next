"use client";
import React from 'react'
import { useSelector } from "react-redux";
import {RootState} from "@/store/store";
import { Button } from '@/components/ui/button';


const Home = () => {
    const auth = useSelector((state: RootState) => state.auth);
    
    return (
        <div>
            {!auth.instituteId && <Button>Add Institute</Button>}

        </div>
    )
}

export default Home
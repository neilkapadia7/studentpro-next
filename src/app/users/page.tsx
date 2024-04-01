"use client"
// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {RootState} from "@/store/store";
import { DataTable } from "@/components/layouts/DataTable";
import {columns} from "./UserDataColumns"
import {getAllUsers} from "../../services/admin/index"
import { useCallback, useEffect, useState } from "react";
import Loading from "@/components/layouts/Loading";

export const page = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const [loading, setloading] = useState(true);
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);



    // const getUserData = useCallback(async () => {
    //     let data: any = await getAllUsers();
    //     console.log("data -> ", data);
    //     if(data.data) {
    //         setUsers(data.data);
    //     }
    // }, []);

    const getUserData = async () => {
        let data = await getAllUsers();
        console.log("data -> ", data);
        if(data.data) {
            setUsers(data.data);
        }
    };

    useEffect(() => {
        setloading(true);
        getUserData();
        setloading(false);
    }, []);

    

    return (
        <>
            <div className="mt-32 mx-20">
                {loading 
                    ? <Loading /> 
                    :
                    <>
                        <h1 className="text-3xl font-semibold">All Users</h1>
                        <DataTable columns={columns} data={users} />
                    </>
                }
                
                {/* <h1 className="text-3xl font-semibold">All Users</h1>
                <DataTable columns={columns} data={users} /> */}
            </div>
        </>
    )
}

export default page;

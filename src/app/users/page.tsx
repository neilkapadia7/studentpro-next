"use client"
// import React from 'react'
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {RootState} from "@/store/store";
import { DataTable } from "@/components/layouts/DataTable";
import {getAllUsers} from "../../services/admin/index"
import { useCallback, useEffect, useState } from "react";
import Loading from "@/components/layouts/Loading";
import UserModal from "./UserModal";

export const page = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const [loading, setloading] = useState(true);
    // const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    

    const getUserData = async () => {
        setloading(true);
        let data = await getAllUsers();
        if(data.data) {
            setUsers(data.data);
        }
        setloading(false);

    };

    useEffect(() => {
        getUserData();
    }, []);

    type Users = {
        name: string
        email: string
        institute: string
        isFreeUser: boolean
        accessType: string
        isAdminUser: string
        expiryDate: Date,
        revokedOn: Date
    }
       
    const columns: ColumnDef<Users>[] = [
        {
          accessorKey: "name",
          header: "Full Name",
          cell: ({ row }) => {
            return <div className="font-medium">{!row.getValue("name") ? "-" : row.getValue("name")}</div>
          },
        },
        {
          accessorKey: "email",
          header: "Email",
          cell: ({ row }) => {
            return <div className="font-medium">{!row.getValue("email") ? "-" : row.getValue("email")}</div>
          },
        },
        {
          accessorKey: "institute",
          header: "Institute",
          cell: ({ row }) => {
            return <div className="font-medium">{!row.getValue("institute") ? "-" : row.getValue("institute")}</div>
          },
        },
        {
          accessorKey: "isFreeUser",
          header: "Free User",
          cell: ({ row }) => {
            return <div className="font-medium">{!row.getValue("isFreeUser") ? "No" : "Yes"}</div>
          },
        },
        {
          accessorKey: "accessType",
          header: "User Type",
          cell: ({ row }) => {
            return <div className="font-medium">{!row.getValue("accessType") ? "-" : row.getValue("accessType")}</div>
          },
        },
        {
          accessorKey: "isAdminUser",
          header: "Admin User",
          cell: ({ row }) => {
            return <div className="font-medium">{!row.getValue("isAdminUser") ? "No" : "Yes"}</div>
          },
        },
        {
          accessorKey: "expiryDate",
          header: "Expiry Date",
          cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("expiryDate") ? `${Moment(row.original.expiryDate).format("DD/MM/YYYY")}` : row.original.revokedOn ? `${Moment(row.original.revokedOn).format("DD/MM/YYYY")}` : "-"}</div>
          },
        },
        {
          accessorKey: "_id",
          header: "Update Access",
          cell: ({ row }) => {
            return (
                <UserModal getUserData={getUserData} loggedInUserId={auth.id}  row={row.original}/>
            )
          },
        }
      ]

    return (
        <>
            <div className="mt-32 mx-20">
                {loading 
                    ? <Loading /> 
                    :
                    <>
                        <div className="flex justify-between">
                            <h1 className="text-3xl font-semibold">All Users</h1>
                            <Button >Add New User</Button>
                        </div>
                        <DataTable columns={columns} data={users} />
                        
                    </>
                }
            </div>
        </>
    )
}

export default page;

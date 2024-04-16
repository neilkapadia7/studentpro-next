"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {RootState} from "@/store/store";
import { DataTable } from "@/components/layouts/DataTable";
import { useCallback, useEffect, useState } from "react";
import Loading from "@/components/layouts/Loading";
import { addInstituteUser, getAllInstituteUsers } from '@/actions/reduxActions/batchDetails';
import DashboardInputModal from '@/components/layouts/DashboardInputModal';

import UserModal from '../admin/users/UserModal';
// import UserModal from "./UserModal";


type addNewUserType = {
    _id: string
    name: string
    email: string
    password: string
    instituteId?: string
    isManualUserGeneration?: boolean 
    accessType: "Instructor" | "InstituteAdmin" | "BatchAdmin"
    batchId: string
}

type Users = {
    _id: string
    name: string
    email: string
    batchId?: [{name: string, _id: string}]
    accessType: string,
    isActive: boolean
}

export default function Users () {
    

    const auth = useSelector((state: RootState) => state.auth);
    const batchDetails = useSelector((state: RootState) => state.batchDetails);
    const dispatch = useDispatch();

    const addUser = (params:addNewUserType) => {
        params.instituteId = auth.instituteId;
        dispatch(addInstituteUser(params));
    }

    useEffect(() => {
        if(auth.loggedIn && (!batchDetails.users || batchDetails.users && !batchDetails.users[0])) {
            dispatch(getAllInstituteUsers());
        }
    }, [auth.loggedIn, batchDetails.users])
       
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
          accessorKey: "batchId",
          header: "Batch",
          cell: ({ row }) => {
            return <div className="font-medium">{row.original.batchId && row.original.batchId[0]?.name || "-"}</div>
          },
        },
        {
          accessorKey: "accessType",
          header: "Access Type",
          cell: ({ row }) => {
            return (
            <div className="font-medium">
                {row.original.accessType ? 
                    row.original.accessType.replace(/([a-z])([A-Z])/, '$1 $2')
                    : "-"
                }
            </div>)
          },
        },
        {
          accessorKey: "_id",
          header: "Update Access",
          cell: ({ row }) => {
            return (
                <>
                {row.original._id == auth.id ?
                        <Button variant="destructive">
                            Logged In User
                        </Button>
                    :
                      <DashboardInputModal buttonTitle="Update User" title={`Update ${row.original.name || "-"}`} label="Name" triggerApi={addUser} placeholder="John Doe" batches={batchDetails.batch} type="UserUpdate" data={{name: row.original.name, accessType: row.original.accessType, batchId: row.original?.batchId && row.original?.batchId[0]?._id, isActive: row.original.isActive}}/>
                        // <UserModal getUserData={getAllInstituteUsers} loggedInUserId={auth.id}  row={row.original}/>
                }
                </>
            )
          },
        }
      ]

  return (
        <>
            <div>
                    <>
                        <div className="flex justify-between">
                            <h1 className="text-3xl font-semibold">All Users</h1>
                            <DashboardInputModal buttonTitle="Add New User" title="Add User" subtitle="Add User to your institute with the selected role" label="Name" triggerApi={addUser} placeholder="John Doe" batches={batchDetails.batch} type="User" />
                        </div>
                        <DataTable columns={columns} data={batchDetails.users} />
                        
                    </>
            </div>
        </>
  )
}

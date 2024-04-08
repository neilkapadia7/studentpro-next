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
import { getAllInstituteUsers } from '@/actions/reduxActions/batchDetails';
// import UserModal from "./UserModal";

export default function Users () {

    const auth = useSelector((state: RootState) => state.auth);
    const batchDetails = useSelector((state: RootState) => state.batchDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        if(auth.loggedIn && (!batchDetails.users || batchDetails.users && !batchDetails.users[0])) {
            dispatch(getAllInstituteUsers());
        }
    }, [auth.loggedIn, batchDetails.users])

    type Users = {
        name: string
        email: string
        batchId?: [{name: string, _id: string}]
        accessType: string
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
            return <div className="font-medium">{row.original.accessType || "-"}</div>
          },
        },
        {
          accessorKey: "_id",
          header: "Update Access",
          cell: ({ row }) => {
            return (
                <Button>Update Access</Button>
                // <UserModal getUserData={getUserData} loggedInUserId={auth.id}  row={row.original}/>
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
                            <Button >Add New User</Button>
                        </div>
                        <DataTable columns={columns} data={batchDetails.users} />
                        
                    </>
            </div>
        </>
  )
}

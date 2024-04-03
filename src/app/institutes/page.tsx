"use client";
import React, { useEffect, useState } from 'react'
import { getAllInstitute } from '@/services/admin';
import Loading from '@/components/layouts/Loading';
import { DataTable } from "@/components/layouts/DataTable";
import { Button } from '@/components/ui/button';
import { ColumnDef } from "@tanstack/react-table";

export const Institute = () => {
    const [loading, setloading] = useState(true);
    const [institutes, setInstitutes] = useState([]);



    async function refreshInstitute() {
        setloading(true);
        let res = await getAllInstitute({});
        if(res.data) {

        }
        setloading(false);

    }

    useEffect(() => {
        refreshInstitute();
    }, []);


    type Institute = {
        name: string
        adminId: {
            name: string,
            _id: string
        },
        isActive: boolean
    }
       
    const columns: ColumnDef<Institute>[] = [
        {
          accessorKey: "name",
          header: "Name",
          cell: ({ row }) => {
            return <div className="font-medium">{!row.getValue("name") ? "-" : row.getValue("name")}</div>
          },
        },
        {
          accessorKey: "adminId",
          header: "Requested By",
          cell: ({ row }) => {
            return <div className="font-medium">{row.original.adminId?.name || "-"}</div>
          },
        },
        {
          accessorKey: "isActive",
          header: "Approved Status",
          cell: ({ row }) => {
            return <div className="font-medium">{!row.getValue("institute") ? "-" : row.getValue("institute")}</div>
          },
        },
        {
          accessorKey: "_id",
          header: "Update Access",
          cell: ({ row }) => {
            return (
                <Button>Test</Button>
                // <InstituteModal getUserData={refreshInstitute} row={row.original}/>
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
                            <h1 className="text-3xl font-semibold">All Institues</h1>
                            <Button >Add New Institute</Button>
                        </div>
                        <DataTable columns={columns} data={institutes} />
                        
                    </>
                }
            </div>
        </>
  )
}

export default Institute;

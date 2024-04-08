"use client";
import React, { useEffect, useState } from 'react'
import { getAllInstitute, updateInstitute } from '@/services/admin';
import Loading from '@/components/layouts/Loading';
import { DataTable } from "@/components/layouts/DataTable";
import { Button } from '@/components/ui/button';
import { ColumnDef } from "@tanstack/react-table";
import ProModal from '@/components/layouts/ProModal';
import {RootState} from "@/store/store";
import { useSelector } from "react-redux";
import { toast } from '@/components/ui/use-toast';

export const Institute = () => {
    const [loading, setloading] = useState(true);
    const [institutes, setInstitutes] = useState([]);
    const auth = useSelector((state: RootState) => state.auth);

    async function refreshInstitute() {
        setloading(true);
        let res = await getAllInstitute({});
        if(res.status == 200) {
          setInstitutes(res.data.data);
        }
        setloading(false);
    }

    async function updateInstituteStatus(id: string) {
        try {
            setloading(true);
            let newObj: any = [...institutes];
            newObj.filter((el: any) => el?._id.toString() !== id.toString());
            
            let res = await updateInstitute({
                instituteId: id, 
                isActive: !newObj[0].isActive,
            });

            if(res.status == 200) {
                await refreshInstitute();
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Error in Updating Institute Status"
            })
        }
        
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
            return <div className="font-medium">{row.original.isActive ? "Yes" : "No"}</div>
          },
        },
        {
          accessorKey: "_id",
          header: "Update Access",
          cell: ({ row }) => {
            return (
                // <Button>Test</Button>
                <ProModal 
                    buttonTitle={row.original.isActive ? "Make it Deactive" : "Make it Active"}
                    title={"Are you absolutely sure?"} 
                    subtitle={row.original.isActive ? "Do you want to deactivate institute?" : "Do you want to approve institute?"}
                    variant={row.original.isActive ? "destructive" : "secondary"} 
                    row={row.original}
                    loggedInUserId={auth._id} 
                    triggerApi={updateInstituteStatus}
                    refreshApi={refreshInstitute} 
                    toastMessage="Success"
                    // getUserData={refreshInstitute} row={row.original}
                    />
            )
          },
        }
      ]

  return (
        <>
            <div>
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

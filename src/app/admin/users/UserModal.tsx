"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { updateUserAccess } from "@/services/admin";


export default function UserModal({modal, variant, row, loggedInUserId, getUserData} : {modal?: boolean, variant?: any, row: any, loggedInUserId: string, getUserData: Function}) {
    const {toast} = useToast();

    async function deactiveUser() {
        if(loggedInUserId == row._id) {
            toast({
                title: "Invalid Action",
                description: "Cannot Deactivate Logged-In Account",
                variant: "destructive"
            });
        } else {
            let updateAccess = await updateUserAccess({
                userId: row._id, 
                terminateAccess: row.isActive,
            });

            if(updateAccess.status == 200) {
                toast({
                    title: "Success",
                    description: "User Deactivated!"
                });
                getUserData(); 
            }
               
        }
    }
    
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={loggedInUserId == row._id || !row.isActive ? "secondary" : "destructive"}>
                    {loggedInUserId == row._id ? "Logged In User" : "Update Access"} 
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    {row.isActive ? `Do you want revoke access Test for ${row.name}?` : `Do you want to make user active?`}
                    <br />
                    <Button variant="destructive" className="my-5" onClick={deactiveUser}>Yes</Button>
                </DialogDescription>
            </DialogHeader>
            </DialogContent>
        </Dialog>
    )
} 
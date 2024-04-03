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


export default function ProModal({title, subtitle, variant, row, loggedInUserId, triggerApi ,refreshApi, toastMessage} 
        : {title: string, subtitle: string, variant?: any, row: any, loggedInUserId: string, 
            triggerApi: Function, refreshApi: Function, toastMessage?: string}) {
    const {toast} = useToast();

    async function performAction() {
        if(loggedInUserId == row._id) {
            toast({
                title: "Invalid Action",
                description: "Cannot Deactivate Logged-In Account",
                variant: "destructive"
            });
        } else {
            let updateAccess = await triggerApi();

            if(updateAccess.status == 200) {
                toast({
                    title: "Success",
                    description: toastMessage ? toastMessage : "Success"
                });
                // refreshApi(); 
            }
               
        }
    }
    
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={variant}>
                    {title}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    {subtitle}
                    <br />
                    <Button variant="destructive" className="my-5" onClick={performAction}>Yes</Button>
                </DialogDescription>
            </DialogHeader>
            </DialogContent>
        </Dialog>
    )
} 
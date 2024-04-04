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


export default function ProModal({buttonTitle, title, subtitle, variant, row, loggedInUserId, triggerApi ,refreshApi, toastMessage} 
        : {buttonTitle: string, title: string, subtitle: string, variant?: any, row: any, loggedInUserId: string, 
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
            await triggerApi(row._id);
        }
    }
    
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={variant}>
                    {buttonTitle}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
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
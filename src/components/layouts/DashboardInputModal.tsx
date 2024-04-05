"use client";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";


export default function DashboardInputModal({buttonTitle, title, subtitle, label, triggerApi, placeholder } 
        : {buttonTitle: string, title: string, subtitle: string, label: string, placeholder: string
            triggerApi: Function}) {
    const {toast} = useToast();
    const [text, setText] = useState("");

    async function performAction() {
        if(!text) {
            toast({
                title: "Invalid Action",
                description: "Please Fill the fields",
                variant: "destructive"
            });
        } else {
            await triggerApi(text);
            setText("");
        }
    }
    
    
    return (
        <Dialog>
            <DialogTrigger><Button >{buttonTitle}</Button></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {subtitle}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            {label}
                        </Label>
                        <Input id="name" value={text} placeholder={placeholder} className="col-span-3" onChange={(e) => setText(e.target.value)}/>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={performAction}>
                            Save changes
                        </Button>
                    </ DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 
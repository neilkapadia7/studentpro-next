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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";


export default function DashboardInputModal({buttonTitle, title, subtitle, label, triggerApi, placeholder, type, batches } 
        : {buttonTitle: string, title: string, subtitle: string, label: string, placeholder: string
            triggerApi: Function, type: "Batch" | "Student" | "User", batches?: Array<any>}) {
    const {toast} = useToast();
    const [text, setText] = useState("");
    const [email, setEmail] = useState("");
    const [currentBatch, setCurrentBatch] = useState("");

    async function performAction() {
        if(!text) {
            toast({
                title: "Invalid Action",
                description: "Please Fill the fields",
                variant: "destructive"
            });
        } else {
            let payload:any = {
                name: text
            };
            if(type === "Student") {
                if(!currentBatch || !email) {
                    return toast({
                        title: "Error",
                        description: "Please add all fields",
                        variant: "destructive"
                    });
                }
                payload.email = email;
                payload.currentBatch = currentBatch;
            }
            await triggerApi(payload);
            setText("");
            setEmail("");
            setCurrentBatch("");
        }
    }
    
    
    return (
        <Dialog>
            <DialogTrigger><Button >{buttonTitle}</Button></DialogTrigger>
            {/* <DialogContent className="sm:max-w-[425px]"> */}
            <DialogContent className="px-10 py-10">
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
                        
                        {type === "Student" &&
                            <>
                                <Label htmlFor="name" className="text-right">
                                    Email
                                </Label>
                                <Input type="email" id="name" value={email} placeholder="test@example.com" className="col-span-3" onChange={(e) => setEmail(e.target.value)}/>

                                <Label htmlFor="name" className="text-right">
                                    Batch
                                </Label>
                                <Select required={true} onValueChange={(str)=> setCurrentBatch(str)} value={currentBatch}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Batch" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {batches?.map(el => (
                                            <SelectItem key={el._id} value={el._id}>{el.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </>
                        }
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
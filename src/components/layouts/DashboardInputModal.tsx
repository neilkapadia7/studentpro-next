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
import { use, useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch"


export default function DashboardInputModal({buttonTitle, title, subtitle, label, triggerApi, placeholder, type, batches, data } 
        : {buttonTitle: string, title: string, subtitle?: string, label: string, placeholder: string
            triggerApi: Function, type: "Batch" | "Student" | "User" | "UserUpdate", batches?: Array<any>, data?: {name: string, accessType: string, batchId?: string | undefined | null, isActive?: boolean}}) {
    const {toast} = useToast();
    const [text, setText] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accessType, setAccessType] = useState("");
    const [currentBatch, setCurrentBatch] = useState("");
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        if(data) {
            if(data.name) {
                setText(data.name);
            }
            if(data.accessType) {
                setAccessType(data.accessType);
            }
            if(data.batchId) {
                setCurrentBatch(data.batchId);
            }
            if("isActive" in data) {
                setIsActive(data?.isActive);
            }
            
        }
    }, [data]);

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
            if (type === "UserUpdate") {
                if(!text || !accessType) {
                    return toast({
                        title: "Error",
                        description: "Please add all fields",
                        variant: "destructive"
                    });
                }

                if(accessType == "BatchAdmin") {
                    if(!currentBatch) {
                        return toast({
                            title: "Error",
                            description: "Please add all fields",
                            variant: "destructive"
                        });
                    }
                    payload.batchId = currentBatch;
                }

                payload.name = text;
                payload.isActive = isActive;
                payload.accessType = accessType;
            }

            
            if(type === "User") {
                if(!email || !password || !accessType) {
                    return toast({
                        title: "Error",
                        description: "Please add all fields",
                        variant: "destructive"
                    });
                }

                if(accessType == "BatchAdmin") {
                    if(!currentBatch) {
                        return toast({
                            title: "Error",
                            description: "Please add all fields",
                            variant: "destructive"
                        });
                    }
                    payload.batchId = currentBatch;
                }

                payload.email = email;
                payload.password = password;
                
                payload.accessType = accessType;
            }
            await triggerApi(payload);
            setText("");
            setEmail("");
            setPassword("");
            setAccessType("");
            setCurrentBatch("");
        }
    }
    
    
    return (
        <Dialog>
            <DialogTrigger><Button variant={type === "UserUpdate" && !isActive ? "default" : "secondary"}>{buttonTitle}</Button></DialogTrigger>
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

                                <Label htmlFor="currentBatch" className="text-right">
                                    Batch
                                </Label>
                                <div className="col-span-3">
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
                                </div>
                            </>
                        }

                        {type === 'UserUpdate' &&
                                <>
                                <Label htmlFor="accessType" className="text-right">
                                    Access Type
                                </Label>
                                <div className="col-span-3">
                                    <Select required={true} onValueChange={(str)=> setAccessType(str)} value={accessType}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select Access Type" />
                                        </SelectTrigger>
                                        <SelectContent>    
                                            <SelectItem key="InstituteAdmin" value="InstituteAdmin">InstituteAdmin</SelectItem>
                                            <SelectItem key="Instructor" value="Instructor">Instructor</SelectItem>
                                            <SelectItem key="BatchAdmin" value="BatchAdmin">BatchAdmin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {accessType == "BatchAdmin" && 
                                    <>
                                        <Label htmlFor="batchId" className="text-right">
                                            Batch
                                        </Label>

                                        <div className="col-span-3">
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
                                        </div>
                                    </>
                                }

                                <Label htmlFor="isActive" className="text-right">
                                    Active Status
                                </Label>
                                <Switch  onCheckedChange={() => setIsActive(!isActive)} defaultChecked={isActive}/>

                            </>
                        
                        }

                        {type === "User" &&
                            <>
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input type="email" id="name" value={email} placeholder="test@example.com" className="col-span-3" onChange={(e) => setEmail(e.target.value)}/>
                                
                                <Label htmlFor="password" className="text-right">
                                    Password
                                </Label>
                                <Input type="password" id="password" value={password} placeholder="*****" className="col-span-3" onChange={(e) => setPassword(e.target.value)}/>



                                <Label htmlFor="accessType" className="text-right">
                                    Access Type
                                </Label>
                                <div className="col-span-3">
                                    <Select required={true} onValueChange={(str)=> setAccessType(str)} value={accessType}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select Access Type" />
                                        </SelectTrigger>
                                        <SelectContent>    
                                            <SelectItem key="InstituteAdmin" value="InstituteAdmin">InstituteAdmin</SelectItem>
                                            <SelectItem key="Instructor" value="Instructor">Instructor</SelectItem>
                                            <SelectItem key="BatchAdmin" value="BatchAdmin">BatchAdmin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {accessType == "BatchAdmin" && 
                                    <>
                                        <Label htmlFor="batchId" className="text-right">
                                            Batch
                                        </Label>

                                        <div className="col-span-3">
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
                                        </div>
                                    </>
                                }
                                
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
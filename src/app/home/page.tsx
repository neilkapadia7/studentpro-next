"use client";
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import {RootState} from "@/store/store";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addInstitute, updateInstitute } from '@/services/institute';
import { toast } from '@/components/ui/use-toast';
import { updateInstituteDetails } from '@/actions/reduxActions/institute';
import { useDispatch } from 'react-redux';


const Home = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const [domLoaded, setDomLoaded] = useState(false);
    const [instituteName, setinstituteName] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        setDomLoaded(true);
    }, []);


    async function saveInstitute() {
        if(instituteName == "" || instituteName.trim() == '' || instituteName == null) {
            toast({
                title: "Error",
                description: "Please Add Institute Name",
                variant: "destructive"
            });
        }
        else {
            let res = await addInstitute({name: instituteName});
            console.log("RES -> ", res.response.data)
            if(res.status == 200) {
                dispatch(updateInstituteDetails(res.data.data));
                console.log(res.data.data);
            } else {
                toast({
                    title: "Error",
                    description: `${res.response.data.message}` || "Server Error",
                    variant: "destructive"
                });
            }
        }
    }
    
    return (
        <>
        {domLoaded && 
            <div>
                {!auth.instituteId ?
                    <div className="text-center justify-center pt-32">
                        <h1 className="font-bold text-6xl text-center">You have not added an Institute yet. <br /> Please add your institute to proceed.</h1>
                        <Dialog>
                            <DialogTrigger><Button className="mt-16 px-10 py-5 font-bold" variant="outline">Add Institute</Button></DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add Institute</DialogTitle>
                                    <DialogDescription>
                                        Please add your institute name below.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                        Institute Name
                                        </Label>
                                        <Input id="name" value={instituteName} placeholder="Excel Institute" className="col-span-3" onChange={(e) => setinstituteName(e.target.value)}/>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button onClick={saveInstitute}>
                                            Save changes
                                        </Button>
                                    </ DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        
                    </ div>

                    : 
                    <>
                        <div className="text-center justify-center pt-32">
                            <h1 className="font-bold text-6xl text-center">
                                Welcome, {auth.instituteDetails.name || auth.name}!
                            </h1>
                            <Button className="mt-16 px-10 py-5 font-bold" variant="outline">Add Batch</Button>
                        </div>
                    </>
                
                }

            </div>
        }
        </>
    )
}

export default Home
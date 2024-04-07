"use client";
import React, { SetStateAction, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {RootState} from "@/store/store";
import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation'
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
import Loading from '@/components/layouts/Loading';
import DashboardCards from '@/components/layouts/DashboardCards';
import { getAllBatch, getAllStudents, addBatch, addStudent } from '@/actions/reduxActions/batchDetails';

interface addStudent {
    name: String,
    email: String,
    currentBatch: String,
    userId?: String,
}

const Home = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const batchDetails = useSelector((state: RootState) => state.batchDetails);
    const [domLoaded, setDomLoaded] = useState(false);
    const [instituteName, setinstituteName] = useState("");
    let [batchName, setbatchName] = useState("");
    const [allBatches, setAllBatches] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        setDomLoaded(true);
        setLoading(false);
    }, []);

    useEffect(() => {
        if(auth.instituteId) {
            setLoading(true);
            dispatch(getAllBatch());
            dispatch(getAllStudents());
        }
    }, [auth.loggedIn]);

    useEffect(() => {
        if(batchDetails.isLoading) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [batchDetails.isLoading]);


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
            if(res.status == 200) {
                dispatch(updateInstituteDetails(res.data.data));
            } else {
                toast({
                    title: "Error",
                    description: `${res.response.data.message}` || "Server Error",
                    variant: "destructive"
                });
            }
        }
    }
    
    async function saveStudent(params: addStudent) {
        dispatch(addStudent(params));
    }
    
    async function saveUser(params:any) {
        
    }

    async function saveBatch({name}: {name?: string}) {
        if(name) {
            batchName = name;
            setbatchName(name);
        }

        dispatch(addBatch({name: batchName}));

        // if(batchName == "" || batchName.trim() == '' || batchName == null) {
        //     toast({
        //         title: "Error",
        //         description: "Please Add Batch Name",
        //         variant: "destructive"
        //     });
        // }
        // else {
        //     try {
        //         const apiUrl = "/api/batch/get";
          
        //         const requestData = {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify({ 
        //                 name: batchName,
        //                 instituteId: auth.instituteId,
        //                 userId: auth.id
        //             }),
        //         };
          
        //         const response = await fetch(apiUrl, requestData);
        //         let data = await response.json();

        //         if (!response.ok) {
        //             toast({
        //                 title: "Error",
        //                 description: data.message || response.statusText,
        //                 variant: "destructive"
        //             });
        //         } else {
        //             let newBatch = [...allBatches, data];
        //             setAllBatches(newBatch);
        //             toast({
        //                 title: "Success",
        //                 description: "Batch Added",
        //             });
        //         }
        //         setbatchName("");

        //     }
        //     catch (err) {
        //         console.log(err);
        //         toast({
        //             title: "Error",
        //             description: "Something went wrong!",
        //             variant: "destructive"
        //         });
        //     }
        // }
    }
    

    async function getAllBatchAPI() {
        try {
            const apiUrl = `/api/batch/get?instituteId=${auth.instituteId}`;
      
            const requestData = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
      
            const response = await fetch(apiUrl, requestData);
            let batches =  await response.json();
            setAllBatches(batches);
            setLoading(false);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
        {loading ? <Loading />
        : domLoaded && (!batchDetails.batch || !batchDetails.batch[0])  &&
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
                            <Dialog>
                                <DialogTrigger><Button className="mt-16 px-10 py-5 font-bold" variant="outline">Add Batch</Button></DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Add Batch</DialogTitle>
                                        <DialogDescription>
                                            Please add the batch name below.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                            Batch Name
                                            </Label>
                                            <Input id="name" value={batchName} placeholder="STD-10 2020-21" className="col-span-3" onChange={(e) => setbatchName(e.target.value)}/>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button onClick={() => saveBatch({})}>
                                                Save changes
                                            </Button>
                                        </ DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </>
                
                }

            </div>
        }

        {batchDetails.batch && batchDetails.batch[0] && 
            <>
                <h1 className="font-bold text-3xl mb-10">
                    Welcome, {auth.instituteDetails.name || auth.name}!
                </h1>
                <DashboardCards batches={batchDetails.batch} students={batchDetails.students} users={batchDetails.batch} addBatch={saveBatch} addStudent={saveStudent} addUser={saveUser}/>
            </>
        }
        </>
    )
}

export default Home
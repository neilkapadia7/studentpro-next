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
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import Moment from "moment";


export default function DashboardTableModal({textTitle, title, data, type } 
        : {
            textTitle: string, title: string, 
            data: Array<{batchId?: [{name: string}], accessType?: string,createdAt?: Date, name: string, userId?: any, _id?: string, currentBatch?: {name: string}, email?: string}>,

            type: "Batch" | "Student" | "User" }) {

    
    return (
        <Dialog>
            <DialogTrigger className="w-full"><p className="text-right w-full text-sm underline cursor-pointer">{textTitle}</p></DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                
                <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

                    {type === "User" &&
                        <>
                            <TableHeader>
                                <TableRow>
                                <TableHead className="w-[100px]">Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Access Type</TableHead>
                                <TableHead>Batch Name</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.accessType}</TableCell>
                                    <TableCell>{user.batchId && user.batchId[0]?.name}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">{data.length || 0}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </>
                    }

                    {type === "Batch" &&
                        <>
                            <TableHeader>
                                <TableRow>
                                <TableHead className="w-[100px]">Name</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>User Id</TableHead>
                                {/* <TableHead className="text-right">Amount</TableHead> */}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((batch) => (
                                <TableRow key={batch._id}>
                                    <TableCell className="font-medium">{batch.name}</TableCell>
                                    <TableCell>{batch?.createdAt?.toString()}</TableCell>
                                    <TableCell>{batch.userId}</TableCell>
                                    {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
                                </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">{data.length || 0}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </>
                    }

                    {type === "Student" &&
                        <>
                            <TableHeader>
                                <TableRow>
                                <TableHead className="w-[100px]">Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Batch</TableHead>
                                <TableHead>Created By</TableHead>
                                {/* <TableHead className="text-right">Amount</TableHead> */}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((student) => (
                                <TableRow key={student._id}>
                                    <TableCell className="font-medium">{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.currentBatch?.name || "-"}</TableCell>
                                    <TableCell>{student.userId.name}</TableCell>
                                    {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
                                </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                <TableCell colSpan={4}>Total</TableCell>
                                <TableCell className="text-right">{data.length || 0}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </>
                    }   
                    </Table>



                <DialogFooter>
                    <DialogClose asChild>
                        <Button>
                            Close
                        </Button>
                    </ DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 
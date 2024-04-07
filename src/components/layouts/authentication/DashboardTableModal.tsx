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
            data: Array<{createdAt: Date, name: string, userId: string, _id: string}>, 
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
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>User Id</TableHead>
                        {/* <TableHead className="text-right">Amount</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((invoice) => (
                        <TableRow key={invoice._id}>
                            <TableCell className="font-medium">{invoice.name}</TableCell>
                            <TableCell>{invoice.createdAt.toString()}</TableCell>
                            <TableCell>{invoice.userId}</TableCell>
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
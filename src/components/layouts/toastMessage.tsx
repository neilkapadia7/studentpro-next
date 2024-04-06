"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from "@/store/store";
import { toast } from '@/components/ui/use-toast';


export default function ToastMessage() {
  const auth = useSelector((state: RootState) => state.auth);
  const batchDetails = useSelector((state: RootState) => state.batchDetails);

  useEffect(() => {
    if(batchDetails.successMessage) {
      toast({
        title: "Success",
        description: batchDetails.successMessage || "Batch Added"
      })
    }
    if(batchDetails.errorMessage) {
      toast({
        title: "Error",
        description: batchDetails.errorMessage || "Server Error",
        variant: "destructive"
      })
    }
  }, [batchDetails.successMessage, batchDetails.errorMessage])

  return (
    <></>
  )
}

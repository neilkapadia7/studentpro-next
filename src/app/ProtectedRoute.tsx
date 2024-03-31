"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const ProtectedRoute = ({children}: Readonly<{children: React.ReactNode}>) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const auth = useSelector((state: RootState) => state.auth);
  const protectedRoutes = ["/admin", "/dashboard", "/users"];

  function substringMatchesArray(str: string, arr : Array<string>) {
    for (let i = 0; i < arr.length; i++) {
        if (str.includes(arr[i])) {
            return true;
        }
    }
    return false;
  }

  // Set Global Loading

  useEffect(() => {
    if (
      substringMatchesArray(pathname, protectedRoutes) &&
      ((!localStorage.getItem('token') && !auth.loggedIn) || !localStorage.getItem('token'))) {
      router.push('/');
    }
    setLoading(false);
  }, []);

    return (
      <>{children}</>
    );
};

export default ProtectedRoute;
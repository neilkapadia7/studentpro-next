"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const ProtectedRoute = ({children}: Readonly<{children: React.ReactNode}>) => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if ((!localStorage.getItem('token') && !auth.loggedIn) || !localStorage.getItem('token')) {
      router.push('/login');
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
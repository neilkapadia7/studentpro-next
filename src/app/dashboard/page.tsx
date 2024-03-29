"use client";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/actions/reduxActions/auth';
import { useRouter } from 'next/navigation'


export default function dashboard () {
  const dispatch = useDispatch();
  const router = useRouter();


  const signOut = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    router.push("/login");
  }

  return (
    <div className="w-full h-full align-middle text-center">
      <h1>DASHBOARD</h1>
      <button onClick={signOut}>Logout</button>
    </div>
  )
}

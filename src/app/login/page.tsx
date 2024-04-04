"use client";
import {useState, useEffect, useRef, FormEvent} from 'react'
import { ReloadIcon } from "@radix-ui/react-icons"
import Image from "next/image";
import BackgroundImage from "../../../public/pexels-mikhail-nilov-8297853.jpg";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store';
import { userSignIn, userSignUp } from '@/actions/reduxActions/auth';
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

// import { Skeleton } from "@/components/ui/skeleton"

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(true);
    const [submitAction, setSubmitAction] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const signUpEmailRef = useRef<HTMLInputElement>(null);
    const signUpPasswordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const {toast} = useToast()
    // const auth = useSelector((state: TypedUseSelectorHook<reducers>) => state.auth);
    const auth = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        let pageState = localStorage.getItem("isLogin");
        if(!pageState) {
            setIsLogin(true);
        } else {
            if(pageState === 'false') {
                setIsLogin(false);
            }
        }

        setLoading(false)
    }, []);

    useEffect(() => {
        // if(auth.isLoading) {
        //     setIsLogin(true);
        // }
        if(auth.loggedIn) {
            if(auth.isAdminUser) {
                router.push("/dashboard");
            } else {
                router.push("/home");
            }
            setSubmitAction(false);
        }
    }, [auth.isLoading, auth.loggedIn]);

    useEffect(() => {
        if(auth.isError && auth.authErrorMessage) {
            toast({
                title: isLogin ? "Login Error!" : "Registration Error!",
                description: auth.authErrorMessage || "Please Try Again",
                variant: "destructive"
            });
            
            setSubmitAction(false);
        }
    }, [auth.authErrorMessage, auth.isError])

    function switchPage() {
        localStorage.setItem("isLogin", `${!isLogin}`);
        setIsLogin(!isLogin);

        // Clear Form State
        if(nameRef?.current) {
            nameRef.current.value = ""
        }
        if(signUpEmailRef?.current) {
            signUpEmailRef.current.value = "";
        }
        if(signUpPasswordRef?.current) {
            signUpPasswordRef.current.value = "";
        }
        if(emailRef?.current) {
            emailRef.current.value = "";
        }
        if(passwordRef?.current) {
            passwordRef.current.value = "";
        }
    }

    function submitAuthentication(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitAction(true);
        let name, email, password;

        if (isLogin) {
            if(emailRef?.current) {
                email = emailRef?.current.value;
            }
            if(passwordRef?.current) {
                password = passwordRef?.current.value;
            }

            
            if(!email || !password) {
                toast({
                    title: "Login Error!",
                    description: "Please fill all details",
                    variant: "destructive"
                });
                return;
            }

            dispatch(
                userSignIn({
                    email, 
                    password
                })
            );
        } else {
            
            if(nameRef?.current) {
                name = nameRef?.current.value;
            }
            if(signUpEmailRef?.current) {
                email = signUpEmailRef?.current.value;
            }
            if(signUpPasswordRef?.current) {
                password = signUpPasswordRef?.current.value;
            }

            
            if(!email || !password || !name) {
                toast({
                    title: "Login Error!",
                    description: "Please fill all details",
                    variant: "destructive"
                });
                return;
            }

            dispatch(
                userSignUp({
                    name,
                    email, 
                    password
                })
            );
        }
    }


    if(loading) {
        return (
            <div className="w-full h-full">
                <h1 className="text-center font-bold">Loading...</h1>
                {/* <Skeleton className="w-[100px] h-[20px] rounded-full" /> */}
            </div>
        )
    }

    return (
        <main className="height-full w-full mx-auto bg-white flex">
            <div className="flex-1 py-20 justify-center items-center">
                <h1 className="text-4xl font-bold text-center">{isLogin ? "Welcome Back!" : "Create New Account"}</h1>
                {isLogin 
                    ? 
                        <p className="text-sm text-center my-5">Don't have an account? <span className="underline cursor-pointer" onClick={switchPage}>Register</span></p>
                    :
                        <p className="text-sm text-center my-5">Already have an account? <span className="underline cursor-pointer" onClick={switchPage}>Sign In</span></p>
                
                }
                <form className="w-full place-content-evenly items-center justify-center" onSubmit={submitAuthentication}>
                    {/* <div className="space-y-12"> */}
                        <div className="mt-20 mx-32 w-auto">

                        {isLogin 
                            ? 
                            <>
                                <div className="mt-5" >
                                    <label className="text-start block text-sm font-medium leading-6 text-gray-900">Email</label>
                                    <div className="mt-2 justify-center">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                                            <input type="email" name="email" id="email" ref={emailRef} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="john@example.com" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                                            <input type="password" name="password" id="password" ref={passwordRef} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="*****" />
                                        </div>
                                    </div>
                                </div>
                                </>
                            :
                            
                            <>
                                <div className="mt-5" >
                                    <label className="text-start block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                                    <div className="mt-2 justify-center">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                                            <input type="text" name="nameRef" id="name" ref={nameRef} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="John Doe" />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-5" >
                                    <label className="text-start block text-sm font-medium leading-6 text-gray-900">Email</label>
                                    <div className="mt-2 justify-center">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                                            <input type="email" name="signUpEmailRef" id="signUpEmailRef" ref={signUpEmailRef} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="john@example.com" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                                            <input type="password" name="signUpPasswordRef" id="signUpPasswordRef" ref={signUpPasswordRef} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="*****" />
                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                            <div className="mt-8">
                                {/* <button type="submit" className="rounded-md px-10 py-3 bg-secondary text-sm font-semibold text-white shadow-sm 
                                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                                ">Submit</button> */}
                                <Button type="submit">
                                    {submitAction && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                                    Submit
                                </Button>
                            </div>
                            

                            {isLogin &&
                                <p className="
                                    mt-5 text-sm underline cursor-pointer "
                                >
                                    Forgot Password?
                                </p>
                            }
                        </div>
                    {/* </div> */}
                </form>
            </div>
            <div className="flex-1">
                <Image src={BackgroundImage} alt="Login At SchoolPRO" />
            </div>


        </main>
    )
}
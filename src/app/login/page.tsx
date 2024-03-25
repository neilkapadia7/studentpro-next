"use client";
import {useState, useEffect, useRef, FormEvent} from 'react'
import Image from "next/image";
import BackgroundImage from "../../../public/pexels-mikhail-nilov-8297853.jpg";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(true);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

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

    function switchPage() {
        localStorage.setItem("isLogin", `${!isLogin}`);
        setIsLogin(!isLogin);

    }

    function submitAuthentication(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let name, email, password;
        if(nameRef?.current) {
            name = nameRef?.current.value;
            nameRef.current.value = '';
        }
        if(emailRef?.current) {
            email = emailRef?.current.value;
            emailRef.current.value = '';
        }
        if(passwordRef?.current) {
            password = passwordRef?.current.value;
            passwordRef.current.value = '';
        }
        console.log({
            name, email, password
        });


    }


    if(loading) {
        return (
            <div className="w-full h-full">
                <h1 className="text-center font-bold">Loading...</h1>
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
                                            <input type="text" name="name" id="name" ref={nameRef} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="John Doe" />
                                        </div>
                                    </div>
                                </div>
                                
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
                        }

                            <div className="mt-8">
                                <button type="submit" className="rounded-md px-10 py-3 bg-secondary text-sm font-semibold text-white shadow-sm 
                                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                                ">Submit</button>
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
        // <figure className="bg-slate-100 rounded-xl p-8 dark:bg-slate-800 size-1/3" style={{margin: "auto"}}>
        //     <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
        //     <blockquote>
        //     <p className="text-lg font-medium">
        //         “Tailwind CSS is the only framework that I've seen scale
        //         on large teams. It’s easy to customize, adapts to any design,
        //         and the build size is tiny.”
        //     </p>
        //     </blockquote>
        //     <figcaption className="font-medium">
        //     <div className="text-sky-500 dark:text-sky-400">
        //         Sarah Dayan
        //     </div>
        //     <div className="text-slate-700 dark:text-slate-500">
        //         Staff Engineer, Algolia
        //     </div>
        //     </figcaption>
        // </div>
        // </figure>
    )
}
"use client";

import Input from "@/components/Input";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa'
import { signIn, useSession } from "next-auth/react";
 
const Auth = () => {
    const router = useRouter()

    const session = useSession()

    useEffect(() => {
        if(session?.status === 'authenticated'){
            router.push('/profiles')
        }
    },[session?.status])

    const [username, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [variant , setVariant] = useState('login')

    const toggleVariant = useCallback(()=>{
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    },[])

    const register = useCallback(async() =>{
        try{
            await axios.post('/api/auth',{
                email,
                username,
                password
            })
        }catch(error){
            console.log(error)
        }
    },[email, username, password])

    const login = useCallback(() =>{
        try{
            signIn('credentials', {
                email,
                password,
                redirect: false,
            })
            .then(() => router.push("/profiles"))
            .catch(() => console.log("SomeThing went wrong"))
            
        }catch(error){
            console.log(error)
        }
    },[email, password, router])


    return ( 
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="logo" className="h-12" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? "Sign in" : "Register"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'register' && (
                                <Input  
                                    label="Username"
                                    onChange={(e : any) => setName(e.target.value)}
                                    id="username"
                                    type="text"
                                    value={username}
                                />
                            )}
                            <Input  
                                label="Email"
                                onChange={(e : any) => setEmail(e.target.value)}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input  
                                label="Password"
                                onChange={(e : any) => setPassword(e.target.value)}
                                id="password"
                                type="password"
                                value={password}
                            />
                        </div>
                        <button onClick={variant === 'login' ? login : register } className=" bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700">
                            {variant === 'login' ? "Login":"Sign Up"}
                        </button>
                        <div className="flex flex-row items-center justify-center gap-4 mt-8">
                                <div 
                                onClick={() => signIn('google', { callbackUrl: '/'}) }
                                className="
                                    w-10
                                    h-10
                                    bg-white
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover:opacity-80
                                    transition
                                ">
                                    <FcGoogle size={30} />
                                </div>
                                <div 
                                onClick={() => signIn('github', { callbackUrl: '/'}) }
                                className="
                                    w-10
                                    h-10
                                    bg-white
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover:opacity-80
                                    transition
                                ">
                                    <FaGithub size={30} />
                                </div>
                        </div>
                        <p className=" text-neutral-500 mt-12">
                            {variant === 'login' ? "First time using Netflix?" : "Already have an Account?"}
                            <span onClick={toggleVariant} className="text-white hover:underline cursor-pointer">
                                {variant === 'login' ? "Create an account" :"Login"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Auth;
"use client";

import { NextPageContext } from "next";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const session = useSession()
  const router = useRouter()
  useEffect(() =>{
    if(session?.status !== 'authenticated'){
      router.push('/auth')
    }
  },[session?.status, router])


  return (
    <>
      <h1 >Netflix Clone</h1>
      <button onClick={() => {signOut();router.push('/auth')}} className="bg-red px-2 py-3">Logout</button>
    </>
  )
}

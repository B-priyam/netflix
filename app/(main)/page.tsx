"use client";

import BillBoard from "@/components/BillBoard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useMovieList from "@/hooks/useMoviesList";
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

  const { data: movies = [] } = useMovieList()

  return (
    <>
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
      </div>
    </>
  )
}

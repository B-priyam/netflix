"use client";

import BillBoard from "@/components/BillBoard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useMovieList from "@/hooks/useMoviesList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import InfoModal from "@/components/InfoModel2";

export default function Home() {

  const session = useSession()
  const router = useRouter()
  useEffect(() =>{
    if(session?.status !== 'authenticated'){
      router.push('/auth')
    }
  },[session?.status, router])

  const { data: movies = [] } = useMovieList()
  const { data: favorities = [] } = useFavorites()
  const { isOpen, closeModel } = useInfoModal()

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModel} />
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My Lists" data={favorities} />
      </div>
    </>
  )
}

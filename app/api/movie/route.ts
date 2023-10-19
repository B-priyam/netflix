import client from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(req : Request){
    try{

        const movieCount = await client.movie.count()
        const randomIndex = Math.floor(Math.random() * movieCount);

        const randomMovie = await client.movie.findMany({
            take:1,
            skip: randomIndex
        })

        return NextResponse.json(randomMovie[0])

    }catch(error){
        console.log(error)
        return new NextResponse("Internal Error",{ status : 500})
    }
}
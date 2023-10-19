import client from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(req : Request){
    try{

        const movies = await client.movie.findMany()

        return NextResponse.json(movies)

    }catch(error){
        console.log(error)
        return new NextResponse("Internal Error",{ status : 500})
    }
}
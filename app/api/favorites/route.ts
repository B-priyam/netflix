import getCurrentUser from "@/app/actions/getCurrentUser"
import client from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(req:Request){
    try{

        const currentUser = await getCurrentUser()

        if(!currentUser){
            return new NextResponse("User Not Found",{ status: 400})
        }

        const favouriteMovies = await client.movie.findMany({
            where:{
                id: {
                    in: currentUser?.favouriteIds
                }
            }
        })

        return NextResponse.json(favouriteMovies)

    }catch(error){
        console.log(error)
        return new NextResponse("Internal Error",{ status : 500})
    }
}
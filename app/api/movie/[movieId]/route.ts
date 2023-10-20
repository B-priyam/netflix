import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface ParamsInterface{
    movieId?:string;
}

export async function GET(
    req:Request,
    { params } : { params: ParamsInterface }
){
    try{
        
        const { movieId } = params
        const currentUser = await getCurrentUser()

        if(!currentUser){
            return new NextResponse("User not Exists",{ status: 400})
        }

        if(!movieId){
            return new NextResponse("Movie Id not Exists",{ status: 400})
        }

        const movie = await client.movie.findUnique({
            where:{
                id:movieId
            }
        })

        if(!movie){
            return new NextResponse("Movie Id not Exists",{ status: 400})
        }

        return NextResponse.json(movie)

    }catch(error){
        console.log(error)
        return new NextResponse("Internal Error",{ status : 500})
    }
}
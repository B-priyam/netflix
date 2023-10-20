import getCurrentUser from "@/app/actions/getCurrentUser"
import client from "@/lib/prismadb"
import { without } from "lodash"
import { NextResponse } from "next/server"

export async function POST(req : Request) {
    try{
        const { movieId } = await req.json()

        const currentUser  = await getCurrentUser()

        if(!currentUser){
            return new NextResponse("User Not Exist",{ status: 400})
        }

        const existingMovie = await client.movie.findUnique({
            where:{
                id:movieId
            }
        })

        if(!existingMovie){
            return new NextResponse("Movie Not Found",{ status: 400})
        }

        const update_user = await client.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                favouriteIds: {
                    push: movieId,
                }
            }
        })

        return NextResponse.json(update_user)

    }catch(error){
        console.log(error)
        return new NextResponse("Internal Error",{ status : 500})
    }
}

export async function DELETE(req : Request) {
    try{
        const { movieId } = await req.json()

        const currentUser  = await getCurrentUser()

        if(!currentUser){
            return new NextResponse("User Not Exist",{ status: 400})
        }

        const existingMovie = await client.movie.findUnique({
            where:{
                id:movieId
            }
        })

        if(!existingMovie){
            return new NextResponse("Movie Not Found",{ status: 400})
        }

        const updatedFavoriteIds = without(currentUser.favouriteIds, movieId)

        const update_user = await client.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                favouriteIds: updatedFavoriteIds
            }
        })

        return NextResponse.json(update_user)

    }catch(error){
        console.log(error)
        return new NextResponse("Internal Error",{ status : 500})
    }
}
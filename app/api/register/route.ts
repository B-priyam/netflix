import client from "@/lib/prismadb";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

export async function POST(req: Request){

    try{
        const { email , username , password} = await req.json()

        const existingUser = await client.user.findUnique({
            where:{
                email
            }
        })

        if(existingUser) return  new NextResponse('Email Already Used',{ status : 422})


        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await client.user.create({
            data:{
                email,
                name: username,
                hashedPassword,
                image:'',
                emailVerified: new Date()
            }
        })

        return NextResponse.json(user)

    } catch(error){
        console.log(error)
        return new NextResponse("Internal Error",{ status : 500})
    }
}


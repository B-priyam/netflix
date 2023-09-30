import client from "@/lib/prismadb";
// import NextAuth from "next-auth/next";
// import Credentials from "next-auth/providers/credentials";


import { compare } from 'bcrypt';
import { NextResponse } from "next/server";


export async function POST(req: Request){
    try{
        const { email , password} = await req.json()

        if(!email || !password) return new NextResponse('Email and password Required',{ status : 422})

        const existingUser = await client.user.findUnique({
            where:{
                email
            }
        })

        if(!existingUser || !existingUser.hashedPassword) return new NextResponse('User Not Found',{ status : 422})

        const isCorrectPassword = await compare(password, existingUser.hashedPassword)

        if(!isCorrectPassword){
            throw new Error("Incorrect Password")
        }

        return NextResponse.json(existingUser)

    }catch(error){
        console.log(error)
        return new NextResponse("Internal Error",{ status : 500})
    }
}



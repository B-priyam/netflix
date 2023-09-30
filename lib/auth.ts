import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


import { compare } from 'bcrypt';
import client from '@/lib/prismadb';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                return null
                // if (!credentials?.email || !credentials?.password) {
                //     throw new Error('Email and password required');
                // }

                // const user = await client.user.findUnique({
                //     where: {
                //         email: credentials.email
                //     }
                // });

                // if (!user || !user.hashedPassword) {
                //     throw new Error('Email does not exist');
                // }

                // const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

                // if (!isCorrectPassword) {
                //     throw new Error('Incorrect password');
                // }

                // return user;
            }
        })
    ],
    pages: {
        error: '/',
        signIn: '/auth'
    },
    debug: false,
    //   adapter: PrismaAdapter(prismadb),
    session: { strategy: 'jwt' },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET
};

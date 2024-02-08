import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { env } from '@/env/server.mjs'

export const options: AuthOptions = {
   // adapter: DrizzleAdapter(db),
   providers: [
      GoogleProvider({
         clientId: env.GOOGLE_CLIENT_ID,
         clientSecret: env.GOOGLE_CLIENT_SECRET,
         authorization: {
            params: {
               prompt: 'consent',
               access_type: 'offline',
               response_type: 'code',
            },
         },
      }),
      CredentialsProvider({
         name: 'Credentials',
         credentials: {
            name: { label: 'Name', type: 'text', placeholder: 'jhondoe' },
            email: { label: 'Email', type: 'text', placeholder: 'jhondoe@gmail.com' },
            password: { label: 'Password', type: 'password' },
         },
         // @ts-expect-error // credentials type
         async authorize(credentials) {
            if (credentials?.email && credentials.password && credentials.name) {
               // check if user exists
               return {
                  email: credentials.email,
                  name: credentials.name,
                  id: Math.random(),
               }
            }
         },
      }),
   ],
   callbacks: {
      session: async ({ session, token }) => {
         if (session?.user) {
            session.user.id = token.uid
         }
         return session
      },
      jwt: async ({ user, token }) => {
         if (user) {
            token.uid = user.id
         }
         return token
      },
   },
   session: {
      strategy: 'jwt',
   },
   secret: env.NEXTAUTH_SECRET,
   debug: env.NODE_ENV === 'development',
}

"use client"
import { SessionProvider } from "next-auth/react"


export default function Provider({children}){
    <SessionProvider>
        {children}
    </SessionProvider>
}
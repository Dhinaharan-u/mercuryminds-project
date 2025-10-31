

"use client"

import React from 'react'
import { signIn } from 'next-auth/react'
export default function  Loginpage (){
  return (
    <>
<div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4 font-bold">Login to Notes App</h1>
      <button
        onClick={() => signIn("google")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>
    </div>

    
    
    </>
  )
}

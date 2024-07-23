"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import CreateForm from './form'

const CreatePage = () => {
    const router = useRouter()

    return (
        <div className='p-4 flex flex-col gap-4 w-full bg-zinc-900 text-white relative'>
            <div className="text-sm cursor-pointer" onClick={() => router.push('/')}>
                {'<-'} back
            </div>
            <CreateForm />
        </div>
    )
}

export default CreatePage

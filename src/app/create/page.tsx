"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import CreateForm from './form'
import BackIcon from '@/components/icon/BackIcon'
import ThreeDot from '@/components/icon/ThreeDot'

const CreatePage = () => {
    const router = useRouter()

    return (
        <div className='p-4 flex flex-col gap-4 w-full bg-zinc-900 text-white relative'>
            <div className="w-full flex items-center justify-between">
                <div className="text-sm cursor-pointer flex items-center gap-1" onClick={() => router.push('/')}>
                    <BackIcon />
                </div>
                <div className="">
                    {/* <ThreeDot /> */}
                </div>
            </div>
            <CreateForm />
        </div>
    )
}

export default CreatePage

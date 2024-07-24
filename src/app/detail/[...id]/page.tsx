"use client"
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import DetailForm from './form'

const CreatePage = () => {
    const router = useRouter()
    const params = useParams()
    const [detailTask, setDetailTask] = useState(null)

    useEffect(() => {
        const getTask = localStorage.getItem('tasks')
        const parsedTask = getTask ? JSON.parse(getTask) : null
        const filteredTask = parsedTask.find((task: any) => task?.slug == params?.id[0])
        setDetailTask(filteredTask)
    }, [params])

    return (
        <div className='p-4 flex flex-col gap-4 w-full bg-zinc-900 text-white relative'>
            <div className="text-sm cursor-pointer" onClick={() => router.push('/')}>
                {'<-'} back
            </div>
            {detailTask && (
                <DetailForm
                    detailTask={detailTask}
                />
            )}
        </div>
    )
}

export default CreatePage

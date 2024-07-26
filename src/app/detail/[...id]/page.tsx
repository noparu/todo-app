"use client"
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import DetailForm from './form'
import { deleteFromLocalStorage } from '@/utils/helper'
import TrashIcon from '@/components/icon/TrashIcon'
import BackIcon from '@/components/icon/BackIcon'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import ThreeDot from '@/components/icon/ThreeDot'

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

    const handleDeleteTodo = (e: any, item: any) => {
        e.preventDefault()
        e.stopPropagation();
        deleteFromLocalStorage(item)
        router.push('/')
    }

    return (
        <div className='p-4 flex flex-col gap-4 w-full bg-zinc-900 text-white relative'>
            <div className="w-full flex items-start justify-between">
                <div className="text-sm cursor-pointer flex items-center gap-1" onClick={() => router.push('/')}>
                    <BackIcon />
                </div>
                <Menu>
                    <MenuButton className="">
                        <ThreeDot />
                    </MenuButton>

                    <MenuItems
                        transition
                        anchor="bottom end"
                        className="w-52 origin-top-right rounded-md border border-zinc-700 bg-zinc-800 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                        <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-sm py-1.5 px-3 data-[focus]:bg-white/10" onClick={(e: any) => handleDeleteTodo(e, detailTask)}>
                                Delete Task
                            </button>
                        </MenuItem>
                        {/* <div className="cursor-pointer text-red-600" onClick={(e: any) => handleDeleteTodo(e, detailTask)}><TrashIcon /></div> */}
                    </MenuItems>
                </Menu>
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

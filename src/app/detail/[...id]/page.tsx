"use client"
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import DetailForm from './form'
import { deleteFromLocalStorage } from '@/utils/helper'
import TrashIcon from '@/components/icon/TrashIcon'
import BackIcon from '@/components/icon/BackIcon'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import ThreeDot from '@/components/icon/ThreeDot'
import ModalBox from '@/components/modal/ModalBox'

const CreatePage = () => {
    const router = useRouter()
    const params = useParams()
    const [edit, setEdit] = useState<boolean>(false)
    const [detailTask, setDetailTask] = useState(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [itemToDelete, setItemToDelete] = useState<any>(null);

    useEffect(() => {
        const getTask = localStorage.getItem('tasks')
        const parsedTask = getTask ? JSON.parse(getTask) : null
        const filteredTask = parsedTask.find((task: any) => task?.slug == params?.id[0])
        setDetailTask(filteredTask)
    }, [params])

    const handleDeleteTodo = (e: any, item: any) => {
        if (!showModal) {
            // e.preventDefault()
            // e.stopPropagation();
            setShowModal(true)
            setItemToDelete(item);
        } else {
            deleteFromLocalStorage(itemToDelete)
            router.push('/')
        }
    }

    return (
        <div className='p-4 flex flex-col gap-4 w-full relative text-white'>
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
                        className="w-52 origin-top-right rounded-md border border-neutral-700 bg-neutral-800 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                        <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-sm py-1.5 px-3 data-[focus]:bg-neutral-700"
                                onClick={() => setEdit(true)}>
                                Edit
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-sm py-1.5 px-3 data-[focus]:bg-neutral-700" onClick={(e: any) => handleDeleteTodo(e, detailTask)}>
                                Delete Task
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
            {detailTask && (
                <DetailForm
                    detailTask={detailTask}
                    edit={edit}
                />
            )}

            {/* modal */}
            <ModalBox
                showModal={showModal}
                setShowModal={setShowModal}
                title="Delete Task"
                description="Are you sure you want to delete this task? This action cannot be undone."
                button="Delete"
                onSubmit={handleDeleteTodo}
            >

            </ModalBox>
        </div>
    )
}

export default CreatePage

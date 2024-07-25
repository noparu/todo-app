"use client"
import Button from '@/components/button/Button'
import InputText from '@/components/input/InputText'
import ModalBox from '@/components/modal/ModalBox'
import { addToLocalStorage, editToLocalStorage, slugify } from '@/utils/helper'
import moment from 'moment'
import { useParams, useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const DetailForm = ({ detailTask }: any) => {
    const router = useRouter();
    const params = useParams()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalEdit, setShowModalEdit] = useState<boolean>(false)

    const [form, setForm] = useState({
        id: detailTask?.id,
        slug: detailTask?.slug,
        title: detailTask?.title,
        description: detailTask?.description,
        created_at: detailTask?.created_at,
        taskId: '',
        task: '',
    })

    const [taskList, setTaskList] = useState<any[]>(detailTask?.taskList)

    // console.log(form)
    console.log(taskList)

    const handleShowModal = () => {
        setShowModal(true)
        setForm({ ...form, task: '', taskId: '' })
    }

    const handleShowModalEdit = (e: any, item: any) => {
        e.preventDefault()
        setShowModalEdit(true);
        setForm({ ...form, task: item?.name, taskId: item?.id })
    }

    const handleChangeInput = (e: any) => {
        const { name, value } = e.target
        if (name === 'title') {
            setForm({ ...form, title: value })
        } else if (name === 'description') {
            setForm({ ...form, description: value })
        } else if (name === 'task') {
            setForm({ ...form, task: value })
        }
    }

    const handleAddTask = (e: any) => {
        e?.preventDefault()
        if (form?.task !== '') {
            setTaskList([...taskList, {
                id: taskList.length + 1,
                name: form?.task,
                checked: false
            }])

            setForm({ ...form, task: '' })
        }
        setShowModal(false)
    }

    const handleEditTask = (e: any) => {
        e?.preventDefault();
        if (form.task !== '') {
            const updatedTaskList = taskList.map(task => {
                if (task.id === form?.taskId) {
                    return {
                        ...task,
                        name: form.task
                    };
                }
                return task
            });
            setTaskList(updatedTaskList);
            setForm({
                ...form,
                task: '',
                taskId: ''
            });
            setShowModalEdit(false);
        }
    }

    const handleRemoveTask = (e: any, taskId: any) => {
        e.preventDefault();
        const updatedTaskList = taskList.filter(task => task.id !== taskId);
        const reindexedTaskList = updatedTaskList.map((task, index) => ({
            ...task,
            id: index + 1
        }));
        setTaskList(reindexedTaskList);
    };

    const handleToggleCheckbox = (e: any, taskId: any) => {
        const updatedTaskList = taskList.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    checked: !task.checked
                };
            }
            return task
        });

        setTaskList(updatedTaskList);
    }

    const handleSaveTask = (e: any) => {
        e.preventDefault()
        const formattedTask = {
            id: form?.id,
            slug: slugify(form?.title),
            title: form?.title,
            description: form?.description,
            created_at: form?.created_at,
            taskList
        }
        try {
            editToLocalStorage(formattedTask)
            router.push('/')
        } catch (error) {
        }
    }

    return (
        <>
            <form onSubmit={handleSaveTask} className='flex flex-col gap-4'>
                <div>
                    <label htmlFor="title" className="text-sm -mb-2">Title</label>
                    <InputText
                        name="title"
                        onChange={handleChangeInput}
                        className="bg-zinc-900"
                        value={form?.title}
                        required />
                </div>

                <div>
                    <label htmlFor="description" className="text-sm -mb-2">Description</label>
                    <InputText
                        name="description"
                        onChange={handleChangeInput}
                        className="bg-zinc-900"
                        value={form?.description} />
                </div>



                <div className="flex flex-col gap-4">
                    <p className='text-sm'>Your Tasks</p>

                    <div className="flex flex-col">
                        {taskList?.map((item: any, index: any) => (
                            <label htmlFor={`checkbox${index + 1}`} className='w-full hover:bg-zinc-800 cursor-pointer flex items-center gap-2 h-10 px-4 rounded-md relative' key={index}>
                                <input type='checkbox' id={`checkbox${index + 1}`} className='accent-zinc-700 outline-none peer'
                                    onChange={(e) => handleToggleCheckbox(e, item?.id)} checked={item?.checked} />
                                <p className='peer-checked:line-through'>{item?.name}
                                </p>

                                <div className="absolute right-0 my-auto mx-4 z-10 flex items-center gap-4">
                                    <div className="" onClick={(e: any) => handleShowModalEdit(e, item)}>🤑</div>
                                    <div className="" onClick={(e: any) => handleRemoveTask(e, item?.id)}>😡</div>
                                </div>
                            </label>
                        ))}
                    </div>

                    <Button onClick={handleShowModal}>Add Task</Button>
                    {taskList.length ? (
                        <Button type="submit">Save Changes</Button>
                    ) : <></>}
                </div>
            </form>

            {/* modal add task */}
            <ModalBox
                showModal={showModal}
                setShowModal={setShowModal}
                title="Add New Task"
                description="Enter details of the task you wish to add."
                button="Add Task"
                onSubmit={handleAddTask}
            >
                <form onSubmit={handleAddTask}>
                    <InputText
                        name="task"
                        className="bg-zinc-800"
                        onChange={handleChangeInput}
                        value={form?.task}
                    />
                </form>
            </ModalBox>

            {/* modal edit task */}
            <ModalBox
                showModal={showModalEdit}
                setShowModal={setShowModalEdit}
                title="Edit Task"
                description="Update the details of the task you wish to edit."
                button="Save Changes"
                onSubmit={handleEditTask}
            >
                <form onSubmit={handleEditTask}>
                    <InputText
                        name="task"
                        className="bg-zinc-800"
                        onChange={handleChangeInput}
                        value={form?.task}
                    />
                </form>
            </ModalBox>
        </>
    )
}

export default DetailForm

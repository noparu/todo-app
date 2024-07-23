"use client"
import Button from '@/components/button/Button'
import InputText from '@/components/input/InputText'
import ModalBox from '@/components/modal/ModalBox'
import React, { useState } from 'react'

const CreateForm = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [form, setForm] = useState({
        title: '',
        description: '',
        task: '',
    })

    const [taskList, setTaskList] = useState<any[]>([])

    const handleShowModal = () => {
        setShowModal(true)
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
                name: form?.task
            }])

            setForm({ ...form, task: '' })
        }
        setShowModal(false)
    }

    const handleRemoveTask = (taskId: any) => {
        const updatedTaskList = taskList.filter(task => task.id !== taskId);
        const reindexedTaskList = updatedTaskList.map((task, index) => ({
            ...task,
            id: index + 1
        }));
        setTaskList(reindexedTaskList);
    };

    console.log({ form, taskList })

    return (
        <>
            <form className='flex flex-col gap-4'>
                <div>
                    <label htmlFor="title" className="text-sm -mb-2">Title</label>
                    <InputText
                        name="title"
                        onChange={handleChangeInput}
                        className="bg-zinc-900"
                        value={form?.title} />
                </div>

                <div>
                    <label htmlFor="description" className="text-sm -mb-2">Description</label>
                    <InputText
                        name="description"
                        onChange={handleChangeInput}
                        className="bg-zinc-900"
                        placeholder="(Optional)"
                        value={form?.description} />
                </div>



                <div className="flex flex-col gap-4">
                    <p className='text-sm'>Your Tasks</p>

                    {taskList?.map((item: any, index: any) => (
                        <div key={index} className='cursor-pointer' onClick={() => handleRemoveTask(item?.id)}>{item?.name}</div>
                    ))}

                    <Button onClick={handleShowModal}>Add Task</Button>
                </div>
            </form>

            {/* modal */}
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
                        value={form?.task} />
                </form>
            </ModalBox>
        </>
    )
}

export default CreateForm

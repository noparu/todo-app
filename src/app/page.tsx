"use client"
import CrossIcon from "@/components/icon/CrossIcon"
import ThreeDot from "@/components/icon/ThreeDot"
import TrashIcon from "@/components/icon/TrashIcon"
import ModalBox from "@/components/modal/ModalBox"
import { deleteFromLocalStorage } from "@/utils/helper"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import moment from "moment"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Home = () => {
    const router = useRouter()

    const [tasks, setTasks] = useState([]);
    const [indicator, setIndicator] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [itemToDelete, setItemToDelete] = useState<any>(null);

    useEffect(() => {
        const getTaskList = localStorage.getItem('tasks');
        setTasks(getTaskList ? JSON.parse(getTaskList) : [])
    }, [indicator])

    const handleAddTodo = () => {
        router.push('/create')
    }

    const handleDeleteTodo = (e: any, item: any) => {
        if (!showModal) {
            e.preventDefault()
            e.stopPropagation();
            setShowModal(true)
            setItemToDelete(item);
        } else {
            deleteFromLocalStorage(itemToDelete)
            setIndicator(!indicator)
            setItemToDelete(null)
            setShowModal(false)
        }
    }

    return (
        <div className='p-4 flex flex-col gap-4 w-full relative text-white'>
            {/* header */}
            <div className="w-full flex items-center justify-between">
                <div className="">
                    <h1 className='text-sm font-medium'>Hi There 👋</h1>
                    <p className='text-xs block'>Let's give our best today and make it a great day!</p>
                </div>

                <Menu>
                    <MenuButton className="">
                        <ThreeDot />
                    </MenuButton>

                    <MenuItems
                        transition
                        anchor="bottom end"
                        className="w-52 origin-top-right rounded-md border border-neutral-700 bg-neutral-800 p-1 text-white text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                        <MenuItem>
                            {tasks.length ? (
                                <button className="group flex w-full items-center gap-2 rounded-sm py-1.5 px-3 data-[focus]:bg-neutral-700"
                                    onClick={() => setEdit(true)}>
                                    Edit
                                </button>
                            ) : (
                                <button className="group flex w-full items-center gap-2 rounded-sm py-1.5 px-3 data-[focus]:bg-neutral-700"
                                    onClick={() => router.push('/create')}>
                                    Add Task
                                </button>
                            )}
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>

            {/* content */}
            <div className="flex flex-col gap-4">
                <div className="">
                    <h1 className='text-sm font-medium'>Your Tasks</h1>
                </div>

                <div className="w-full flex flex-col gap-3">
                    {tasks.length ? tasks?.map((item: any, index: any) => (
                        <div className="w-full h-[80px] flex gap-3 bg-neutral-800 hover:bg-neutral-700 group rounded-md p-3 cursor-pointer relative transition" key={index}
                            onClick={() => router.push(`/detail/${item?.slug}`)}>
                            <div className="h-full flex items-center">
                                <div className="w-14 h-14 bg-neutral-700 rounded-md group-hover:bg-neutral-600 transition"></div>
                            </div>


                            <div className="flex flex-col justify-start h-full overflow-clip">
                                <div className="flex items-center text-xs font-light gap-4">
                                    <p>{moment(item?.created_at).format('dddd')}</p>
                                    <p>{moment(item?.created_at).format('LT')}</p>
                                </div>
                                <div className="text-sm">
                                    <p>{item?.title}</p>
                                    <p className='font-light'>{item?.description}</p>
                                </div>
                            </div>

                            {edit && (
                                <div className="absolute right-0 mx-3 z-10 text-red-500 group-hover:text-red-600 transition" onClick={(e: any) => handleDeleteTodo(e, item)}><CrossIcon /></div>
                            )}
                        </div>
                    )) : (
                        <div className="text-sm text-white/40 text-center font-light">There are no tasks created</div>
                    )}
                </div>
            </div>

            {/* add button */}
            <div className="fixed right-0 bottom-0 z-10 m-4 cursor-pointer" onClick={handleAddTodo}>
                <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center text-2xl hover:bg-neutral-600 transition rotate-45">
                    <div className="scale-[0.6]">
                        <CrossIcon />
                    </div>
                </div>
            </div>

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

export default Home

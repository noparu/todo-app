"use client"
import { useRouter } from "next/navigation"

const Home = () => {
    const router = useRouter()

    const handleAddTodo = () => {
        router.push('/create')
    }

    return (
        <div className='p-4 flex flex-col gap-4 w-full bg-zinc-900 text-white relative'>
            {/* header */}
            <div className="w-full flex items-center justify-between">
                <div className="">
                    <h1 className='text-sm font-medium'>Hello Jack,</h1>
                    <p className='text-xs block'>You have to work today</p>
                </div>

                <div className="">
                    <span>😶</span>
                </div>
            </div>

            {/* category */}
            <div className="w-full grid grid-cols-2 gap-3">
                <div className="w-full h-[100px] bg-zinc-800 rounded-md"></div>
                <div className="w-full h-[100px] bg-zinc-800 rounded-md"></div>
                <div className="w-full h-[100px] bg-zinc-800 rounded-md"></div>
                <div className="w-full h-[100px] bg-zinc-800 rounded-md"></div>
            </div>

            {/* content */}
            <div className="flex flex-col gap-4">
                <div className="">
                    <h1 className='text-sm font-medium'>Today's Task</h1>
                </div>

                <div className="w-full flex flex-col gap-3">
                    <div className="w-full h-[80px] flex gap-3 bg-zinc-800 rounded-md p-3">
                        <div className="h-full flex items-center">
                            <div className="w-14 h-14 bg-zinc-700 rounded-md"></div>
                        </div>


                        <div className="flex flex-col justify-start h-full overflow-clip">
                            <div className="flex items-center text-xs font-light gap-4 text-white/80">
                                <p>Today</p>
                                <p>4:50</p>
                            </div>
                            <div className="text-sm">
                                <p>Evening meeting team</p>
                                <p className='text-white/80 font-light'>Evening meeting team</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[80px] bg-zinc-800 rounded-md"></div>
                    <div className="w-full h-[80px] bg-zinc-800 rounded-md"></div>
                    <div className="w-full h-[80px] bg-zinc-800 rounded-md"></div>
                </div>
            </div>

            {/* add button */}
            <div className="fixed right-0 bottom-0 z-10 m-4 cursor-pointer" onClick={handleAddTodo}>
                <div className="w-12 h-12 bg-zinc-700 rounded-full flex items-center justify-center text-2xl text-white/70">+</div>
            </div>
        </div>
    )
}

export default Home

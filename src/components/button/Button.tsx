const Button = ({ children, type = "button", onClick }: any) => {
    return (
        <>
            <button type={type} className='w-full flex justify-center items-center bg-zinc-800 h-10 rounded-md outline-none' onClick={onClick}>
                {children}
            </button>
        </>
    )
}

export default Button

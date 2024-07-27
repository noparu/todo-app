const Button = ({ children, type = "button", onClick, width = "w-full" }: any) => {
    return (
        <>
            <button type={type} className={`${width} flex justify-center items-center bg-neutral-800 h-10 rounded-md outline-none transition hover:ring-1 hover:ring-neutral-700 text-white px-3`} onClick={onClick}>
                {children}
            </button>
        </>
    )
}

export default Button

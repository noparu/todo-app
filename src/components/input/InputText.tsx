const InputText = ({ type = "text", placeholder, onChange, name, value, className }: any) => {
    return (
        <div>
            <input
                type={type}
                className={`w-full border-b outline-none ring-0 text-white ${className}`}
                placeholder={placeholder}
                name={name}
                id={name}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}

export default InputText

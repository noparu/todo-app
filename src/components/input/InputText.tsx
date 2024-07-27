const InputText = ({ type = "text", placeholder, onChange, name, value, className, required }: any) => {
    return (
        <div>
            <input
                type={type}
                className={`w-full border-b border-neutral-600 outline-none ring-0 text-white ${className}`}
                placeholder={placeholder}
                name={name}
                id={name}
                onChange={onChange}
                value={value}
                required={required}
            />
        </div>
    )
}

export default InputText

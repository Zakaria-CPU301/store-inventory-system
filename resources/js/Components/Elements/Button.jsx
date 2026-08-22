export default function Button({
    children,
    className,
    clickFunc,
    props,
    disabled,
}) {
    return (
        <button
            {...props}
            onClick={clickFunc}
            className={`cursor-pointer rounded-2xl capitalize py-2 px-3 flex gap-2 ${className ?? "bg-main-table font-semibold text-indigo-100"}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

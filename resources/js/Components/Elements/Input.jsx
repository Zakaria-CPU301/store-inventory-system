import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export default forwardRef(function Input(
    { type = "text", className = "", isFocused = false, placeholder, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                "input text-sm md:text-xl p-3 w-full rounded-md shadow-md border border-gray-300 focus:border-indigo-600 hover:border-indigo-300 duration-150 outline-none " +
                className
            }
            ref={localRef}
            placeholder={placeholder}
        />
    );
});

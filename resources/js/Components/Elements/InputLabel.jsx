export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm md:text-lg font-medium text-gray-700 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}

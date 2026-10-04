export default function Select({ children, ...props }) {
    return (
        <select
            {...props}
            className="text-sm md:text-xl p-3 w-full rounded-md shadow-md border border-gray-300 focus:border-indigo-600 hover:border-indigo-300 duration-150 outline-none"
        >
            {children}
        </select>
    );
}
export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-sm text-red-600 ' + className}
        >
            {message?.charAt(0).toUpperCase() + message?.slice(1)}
        </p>
    ) : null;
}

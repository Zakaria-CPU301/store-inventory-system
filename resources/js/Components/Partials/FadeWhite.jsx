export default function FadeWhite({ children }) {
    return (
        <div className="size-10 flex justify-center items-center cursor-pointer rounded-full hover:bg-white/10 duration-300">
            {children}
        </div>
    );
}

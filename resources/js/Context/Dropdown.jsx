import { Transition } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import { createContext, useContext, useEffect, useState } from "react";

const DropDownContext = createContext();

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [identity, setIdentity] = useState(null);

    const toggleOpen = () => {
        setOpen((prev) => !prev);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <DropDownContext.Provider
            value={{ open, toggleOpen, handleClose, identity, setIdentity }}
        >
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children, id }) => {
    const { toggleOpen, setIdentity } = useContext(DropDownContext);

    return (
        <div
            onClick={() => {
                toggleOpen();
                setIdentity(id);
            }}
        >
            {children}
        </div>
    );
};

const Close = ({ children }) => {
    const { open, handleClose } = useContext(DropDownContext);

    return (
        <>
            <div onClick={handleClose} className="">
                {children}
            </div>
            {/* {open && (
                <div
                    className="fixed inset-0 z-51 bg-yellow-500"
                    onClick={() => setOpen(false)}
                ></div>
            )} */}
        </>
    );
};

const Content = ({
    id,
    align = "right",
    width = "w-48",
    contentClasses = "py-1 bg-white z-50",
    z = "z-50",
    children,
}) => {
    const { open, identity } = useContext(DropDownContext);

    let alignmentClasses = "origin-top";

    if (align === "left") {
        alignmentClasses = "ltr:origin-top-left rtl:origin-top-right start-0";
    } else if (align === "right") {
        alignmentClasses = "ltr:origin-top-right rtl:origin-top-left end-0";
    }

    return (
        <>
            <Transition
                show={open && identity === id}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div
                    className={`absolute mt-2 rounded-md shadow-lg ${z} ${alignmentClasses} ${width}`}
                >
                    <div className={`rounded-md ` + contentClasses}>
                        {children}
                    </div>
                </div>
            </Transition>
        </>
    );
};

const DropdownLink = ({ className = "", children, ...props }) => {
    return (
        <Link
            {...props}
            className={
                "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none " +
                className
            }
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Close = Close;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;

import { useState } from "react";

export default function Button({ children, className }) {
    // const [toggle, setToggle] = useState(false);

    // const changeToggleValue = () => {
    //     return setToggle(!toggle)
    // }
    return <button className={`py-2 px-3 ${className ?? 'bg-white/30 font-semibold text-indigo-100'} rounded-2xl capitalize`}>{children}</button>;
}

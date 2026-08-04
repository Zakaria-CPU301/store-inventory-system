import { useState } from "react";

export default function Button({ children }) {
    // const [toggle, setToggle] = useState(false);

    // const changeToggleValue = () => {
    //     return setToggle(!toggle)
    // }
    return <button className="py-2 px-4 bg-white text-black rounded-2xl">{children}</button>;
}

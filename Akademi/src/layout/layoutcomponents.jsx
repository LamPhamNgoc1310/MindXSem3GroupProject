import { BsCalendar4Event } from "react-icons/bs";
import { FaBook } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { LiaUserTieSolid } from "react-icons/lia";
import { MdOutlineClass } from "react-icons/md";

const components = [
    {
        title: "Dashboard",
        path: "/admin",
        icon: <IoHomeOutline />,

    },
    {
        title: "Teachers",
        path: "/admin/teacherman",
        icon: <LiaUserTieSolid />,

    },
    {
        title: "Schedule",
        path: "/admin/schedule",
        icon: <BsCalendar4Event />,

    },
    {
        title: "Classes",
        path: "/admin/classman",
        icon: <MdOutlineClass />,

    },
    {
        title: "Curriculum",
        path: "/admin/curriculum",
        icon: <FaBook />,

    },
]
export default components
'use client'

import { notify, axiosInstance } from "@/helper/helper";
import { useRouter } from "next/navigation";
import {
    FiTrash2,
} from "react-icons/fi";

/* STATUS BADGE */
function DeleteBtn({ api }) {
    const router = useRouter();
    function deleteHandler() {
        axiosInstance.delete(api).then((response) => {
            if (response.data.success) {
                router.refresh()
            }
            notify(response.data.message, response.data.success)
        }).catch((error) => {
            console.log(error)
            notify("Internal Server Error", false);
        })

    }

    return (
        <button onClick={deleteHandler} className="p-2 rounded-lg bg-red-100 text-red-500 hover:bg-red-200">
            <FiTrash2 />
        </button>
    );
}

export default DeleteBtn
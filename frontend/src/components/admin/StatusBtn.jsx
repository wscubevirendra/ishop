'use client'

import { notify, axiosInstance } from "@/helper/helper";
import { useRouter } from "next/navigation";

/* STATUS BADGE */
function StatusBadge({ status, flag, api }) {
    const router = useRouter();
    const base =
        "px-3 py-1 rounded-full text-sm font-medium";

    let display = "Active"
    if (flag === "status") {
        display = status ? "Active" : "Inactive"
    }

    if (flag === "is_home") {
        display = status ? "Home" : "Not Home"
    }


    if (flag === "is_top") {
        display = status ? "Top" : "Not Top"
    }

    if (flag === "is_best") {
        display = status ? "Best" : "Not Best"
    }


    function statusHandler() {
        axiosInstance.patch(api, {
            field: flag
        }).then((response) => {

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
        <button onClick={statusHandler} className={`${base} bg-red-100  text-red-600`}>
            {display}
        </button>
    );
}

export default StatusBadge

import { baseUrl, getLocalStorageItem } from "@/utils/utils"
import axios from "axios"


//add attendance
export const addAttendance = async (values) => {
    const { data } = await axios.post(`${baseUrl}/attendance/create`, values, {
        headers: {
            "Authorization": `Bearer ${getLocalStorageItem("token")}`
        },
    })
    return data
}


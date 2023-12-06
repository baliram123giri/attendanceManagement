
import { baseUrl, getLocalStorageItem, myAxios } from "@/utils/utils"
import axios from "axios"


//course list
export async function courseList(cookie) {

    try {
        const { data } = await myAxios.get(`${baseUrl}/course/list`)
        return data
    } catch (error) {
        console.log("/course/list", error.response.data)
    }
}

export const joinedList = async () => {
    const { data } = await myAxios.get(`/attendance/joined/list`)
    return data
}
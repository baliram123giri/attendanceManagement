
import { myAxios } from "@/utils/utils"



//course list
export async function courseList() {

    try {
        const { data } = await myAxios.get(`/course/list`)
        return data
    } catch (error) {
        console.log("/course/list", error.response.data)
    }
}

export const joinedList = async () => {
    const { data } = await myAxios.get(`/attendance/joined/list`)
    return data
}

import { myAxios } from "@/utils/utils"
//add attendance
export const addAttendance = async (values) => {
    const { data } = await myAxios.post(`/attendance/create`, values)
    return data
}


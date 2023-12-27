
import { myAxios } from "@/utils/utils"
//add attendance
export const addAttendance = async (values) => {
    const { data } = await myAxios.post(`/attendance/create`, values)
    return data
}

export const attendanceList = async ({ year, month }) => {
    const { data } = await myAxios.get(`/attendance/list/${month}/${year}`)
    return data
}

export const weeklyAttendanceList = async ({ lastDate, today }) => {
    today?.setHours(23, 59, 59, 999)
    const { data } = await myAxios.post(`/attendance/list/weekly`, { today: today.toISOString(), lastDate: lastDate.toISOString() })
    return data
}


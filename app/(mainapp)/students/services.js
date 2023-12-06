import { myAxios } from "@/utils/utils"

export async function studentList() {
    try {
        const { data } = await myAxios.get(`/users/list`, { withCredentials:true })
        return data
    } catch (error) {
        console.log("/users/list", error?.response?.data)
    }
}
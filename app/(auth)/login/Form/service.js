import { myAxios } from "@/utils/utils"

export const loginApi = async (values) => {
    const { data } = await myAxios.post(`/user/login`, values, {
        withCredentials: true
    })
    return data
}
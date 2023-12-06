import { baseUrl } from "@/utils/utils"
import axios from "axios"

export const loginApi = async (values) => {
    const { data } = await axios.post(`${baseUrl}/user/login`, values,{
        withCredentials:true
    } )
    return data
}
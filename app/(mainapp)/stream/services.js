import { myAxios } from "@/utils/utils"

export async function streamtList() {
    try {
        const { data } = await myAxios.get(`/stream/list`)
        return data
    } catch (error) {
        console.log("/stream/list", error?.response?.data)
    }
}
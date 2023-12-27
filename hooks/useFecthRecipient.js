import { myAxios } from "@/utils/utils"
import { useEffect, useState } from "react"



export const useFecthRecipientUser = (chat = { members: [] }, user = { _id: null }) => {
    const [recipientUser, setRecipientUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const recipientId = chat?.members?.find((id) => id !== user?._id)

    useEffect(() => {
        async function getUserChat() {
            setIsLoading(true)
            try {
                const { data } = await myAxios.get(`/users/find/${recipientId}`)
                setRecipientUser(data)
                return data
            } catch (error) {
                console.log(error.response)
            } finally {
                setIsLoading(false)
            }
        }
        if (chat && user?._id && recipientId) {
            getUserChat()
        }
    }, [chat, recipientId, user?._id])

    return { recipientUser, isLoading }
}


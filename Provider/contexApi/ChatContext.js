import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useMutation } from "@tanstack/react-query";
import { baseURL, myAxios, socket } from "@/utils/utils";
import { usePathname } from "next/navigation";
import notificationSound from "@/public/Audio/notification.mp3"
import { Howl } from 'howler';
export const ChatContex = createContext()

export const ChatContexProvider = ({ children }) => {
    const pathname = usePathname()
    const { user, usersList } = useContext(AuthContext)
    const [sendMessageLoading, setSendMessageLoading] = useState(false)
    const sound = new Howl({
        src: [notificationSound],
    });
    const [usersChat, setUsersChat] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([])
    //set online users
    const { mutate: muateChatList } = useMutation(async () => {
        const { data } = await myAxios.get(`/chats/${user?._id}`)
        setUsersChat(data)
        return data
    })


    //create chat
    const { mutate: CreateChat } = useMutation(async (value) => {
        const { data } = await myAxios.post(`/chats`, value)
        return data
    })

    //call user
    useEffect(() => {
        if (user?._id) {
            const getNotification = async () => {
                try {
                    const { data } = await myAxios.get(`/messages/notifications/${user?._id}`);
                    setNotifications(data)
                    return data;
                } catch (error) {
                    console.log(error.response);
                }
            }
            muateChatList()
            getNotification()

        }
    }, [muateChatList, user?._id])

    //addChat
    useEffect(() => {
        const handAddUsersChat = (newUserChat) => {

            const isCurrentUserChat = newUserChat?.members?.includes(user?._id)

            if (isCurrentUserChat) {
                setUsersChat((prev) => [...prev, newUserChat]);
            }
        };
        socket.on("addChat", handAddUsersChat)
        return () => {
            socket.off("addChat");
        };
    }, [user?._id, usersChat, currentChat, socket])

    const updateSeen = useCallback(async function (chatId) {
        try {
            const { data } = await myAxios.put(`/messages/update/${chatId}`)
            return data
        } catch (error) {
            console.log(error.response)
        }
    }, [])

    // //recive message socket.io
    useEffect(() => {

        socket.on("getMessage", (data) => {
            if (currentChat?._id !== data?.chatId) return
            setMessages((prev) => [...prev, data]);
            if ((user?._id !== data?.senderId) && pathname === "/chats") {
                updateSeen(data?.chatId)

            }
        })

        socket.on("getNotification", (res) => {
            const isChatOpen = currentChat?.members?.some(id => id === res?.senderId?._id)
            if ((pathname !== "/chats") && (user?._id === res?.receiverId)) {
                sound.play()
            }
            if ((!isChatOpen || pathname !== "/chats") && (user?._id === res?.receiverId)) {
                setNotifications((prev) => [res, ...prev])
            }
        })
        return () => {
            socket.off("getMessage")

            socket.off("getNotification")
        }

    }, [socket, currentChat, pathname, sound, messages])


    useEffect(() => {
        socket.on("messageSeen", (res) => {

            const findIndex = messages.findIndex(({ _id }) => res._id === _id)
            if (findIndex !== -1) {
                // console.log(res, "RESmessageSeen")
                // console.log(messages, "messageSeen")
                // const data = { ..., isRead: true }
                messages[findIndex].isRead = true
                // setMessages([...messages, data])
            }
        })
        return () => socket.off("messageSeen")
    }, [messages])

    //messages
    useEffect(() => {
        async function getMessages() {
            try {
                const { data } = await myAxios.get(`/messages/${currentChat?._id}`);
                setMessages(data);
                const isFound = data?.find(({ senderId, isRead }) => {
                    return (senderId !== user?._id) && isRead === false
                })

                if (isFound) {
                    updateSeen(isFound?.chatId)
                }
                return data;
            } catch (error) {
                console.log(error.response);
            }
        }
        if (currentChat?._id) {
            getMessages();
        }
    }, [currentChat]);

    //send message
    const sendMessage = useCallback(
        async (text, chatId, receiverId, senderId, setTextMessage, file, setFile) => {
            setSendMessageLoading(true)
            try {
                const formData = new FormData()
                formData.append("text", text)
                formData.append("chatId", chatId)
                formData.append("senderId", senderId)
                formData.append("receiverId", receiverId)

                if (file) {
                    formData.append("docs", file)
                    formData.append("docsName", file?.name)
                }

                const { data } = await myAxios.post(`/messages`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                setTextMessage("");
                setNewMessage(data)
                setFile(null)
                return data;
            } catch (error) {
                console.log(error.response);
            } finally {
                setSendMessageLoading(false)
            }
        },
        []
    );

    useEffect(() => {

        const handleOnlineUsers = (users) => {
            setOnlineUsers(users)
        }
        socket.on("onlineUsers", handleOnlineUsers)
        return () => socket.off("onlineUsers")
    }, [socket])



    return <ChatContex.Provider value={{ CreateChat, usersChat, updateChat: setCurrentChat, currentChat, sendMessage, messages, setMessages, onlineUsers, notifications, setNotifications, sendMessageLoading }}>
        {children}
    </ChatContex.Provider>
}
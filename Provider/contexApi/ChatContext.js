import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useMutation } from "@tanstack/react-query";
import { baseURL, myAxios, socket } from "@/utils/utils";


export const ChatContex = createContext()

export const ChatContexProvider = ({ children }) => {

    const { user, usersList } = useContext(AuthContext)

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
            muateChatList()
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
    }, [user?._id])

    const updateSeen = useCallback(async function (chatId) {
        const { data } = await myAxios.put(`/messages/update/${chatId}`)
        return data
    }, [])

    // //recive message socket.io
    useEffect(() => {

        socket.on("getMessage", (data) => {
            if (currentChat?._id !== data?.chatId) return
            setMessages((prev) => [...prev, data]);
            if (user?._id !== data?.senderId) {
                updateSeen(data?.chatId)
            }
        })

        // socket.on("getNotification", (res) => {
        //     const isChatOpen = currentChat?.members?.some(id => id === res?.senderId)
        //     setNotifications((prev) => [...prev, ...(isChatOpen ? [{ ...res, isRead: true }] : [res])])
        // })
        return () => {
            socket.off("getMessage")

            // socket.off("getNotification")
        }

    }, [socket, currentChat])


    useEffect(() => {
        socket.on("messageSeen", (res) => {
            const findIndex = messages.findIndex(({ _id }) => res._id === _id)
            if (findIndex !== -1) {
                messages[findIndex].isRead = true
            }
        })
        return () => socket.off("messageSeen")
    }, [socket, messages])
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
        async (text, chatId, senderId, setTextMessage) => {
            try {
                const { data } = await myAxios.post(`/messages`, {
                    text,
                    chatId,
                    senderId,
                });
                setTextMessage("");
                setNewMessage(data)
                return data;
            } catch (error) {
                console.log(error.response);
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




    return <ChatContex.Provider value={{ CreateChat, usersChat, updateChat: setCurrentChat, currentChat, sendMessage, messages, onlineUsers }}>{children}</ChatContex.Provider>
}
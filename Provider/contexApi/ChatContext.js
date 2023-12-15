import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useMutation } from "@tanstack/react-query";
import { baseURL, myAxios, socket } from "@/utils/utils";


export const ChatContex = createContext()

export const ChatContexProvider = ({ children }) => {

    const { user, usersList } = useContext(AuthContext)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [usersChat, setUsersChat] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState(null);
    const [newMessage, setNewMessage] = useState(null);

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

    // //recive message socket.io
    useEffect(() => {
         
        socket.on("getMessage", (data) => {
            console.log(data)
            setMessages((prev) => [...prev, data]);
        })

        return () => socket.off("getMessage")

    }, [socket])

    //messages
    useEffect(() => {
        async function getMessages() {
            try {
                const { data } = await myAxios.get(`/messages/${currentChat?._id}`);
                setMessages(data);

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

    return <ChatContex.Provider value={{ onlineUsers, CreateChat, usersChat, updateChat: setCurrentChat, currentChat, sendMessage, messages }}>{children}</ChatContex.Provider>
}
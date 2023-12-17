import { baseURL, myAxios, socket } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const session = useSession()
    const user = session?.data?.user
    const [usersList, setUsersList] = useState([])


    const { isLoading: isLoadingUser, mutate: mutateUsersList } = useMutation(async () => {
        const { data } = await myAxios.get(`/users/friends/list`)
        setUsersList(data)
        return data
    })

    //fetch users list
    useEffect(() => {
        mutateUsersList()
    }, [mutateUsersList])


    useEffect(() => {
        const handleFindUsers = (user) => {
            setUsersList((prev) => [...prev, user]);
        };

        const handleDeleteUser = (id) => {
            setUsersList((prev) => prev.filter(({ _id }) => _id !== id));
        };



        socket.on("findUsers", handleFindUsers);
        socket.on("deleteUser", handleDeleteUser);


        return () => {
            socket.off("findUsers");
            socket.off("deleteUser");

        };
    }, [socket]);



    //update user
    useEffect(() => {
        if (user?._id) {
            socket.emit("onlineUsers", { _id: user?._id })
        }
    }, [user, socket])

    return <AuthContext.Provider value={{ usersList, isLoadingUser, user, }}>{children}</AuthContext.Provider>
}
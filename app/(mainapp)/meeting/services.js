"use client"
import { baseUrl, getLocalStorageItem } from "@/utils/utils"
import axios from "axios"


//course list
export const courseList = async () => {
    const { data } = await axios.get(`${baseUrl}/course/list`, {
        headers: {
            "Authorization": `Bearer ${getLocalStorageItem("token")}`
        }
    })
    return data
}

export const joinedList = async () => {
    const { data } = await axios.get(`${baseUrl}/attendance/joined/list`, {
        headers: {
            "Authorization": `Bearer ${getLocalStorageItem("token")}`
        },
    })
    return data
}
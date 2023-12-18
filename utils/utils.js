import axios from "axios"
import moment from "moment"
import { toast } from "react-toastify"
import { io } from "socket.io-client"

export const getLocalStorageItem = (name) => {
    return JSON.parse(localStorage.getItem(name))
}


// export const baseURL = "http://localhost:8000"
export const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://api.bgtechub.com"

export const socket = io(baseURL)

export const myAxios = axios.create({
    baseURL: `${baseURL}/api/v1`,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

export function statusHandler() {
    try {
        return {
            onSuccess({ message }) {
                toast(message, { type: "success" })
            },
            onError({ response: { data: { message } } }) {
                toast(message, { type: "error" })
            }

        }
    } catch (error) {
        console.log(error)
    }
}


// export function getTimeAndDate(type = "date", date = new Date()) {
//     if (type === "date") {
//         const day = date.getDate()
//         const month = date.getMonth() + 1
//         const year = date.getFullYear()
//         return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`
//     } else {
//         let hours = date.getHours()
//         const minutes = date.getMinutes()
//         hours = hours % 12 || 12
//         return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${date.getHours() >= 12 ? "PM" : "AM"}`
//     }
// }

export function getTimeAndDate(type = "date", date = new Date(), locale = "en-IN", timezone = "Asia/Kolkata") {
    if (type === "date") {
        return date.toLocaleString(locale, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: timezone
        });
    } else {
        const timeFormat = date.toLocaleString(locale, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: timezone
        });

        return timeFormat;
    }
}


//get notification time

export const momentTime = (createdAt) => {
    // Get the current date
    const currentDate = moment();
    // Get the date of the provided timestamp
    const createdAtDate = moment(createdAt);

    // Calculate the difference in days
    const daysDifference = currentDate.diff(createdAtDate, 'days');

    // Define the format string based on the age of the date
    let formatString = '';

    if (daysDifference === 0) {
        // Today
        formatString = 'h:mm A';
    } else if (daysDifference === 1) {
        // Yesterday
        formatString = '[Yesterday at] h:mm A';
    } else {
        // More than 1 day ago
        formatString = 'MMM D [at] h:mm A';
    }
    const formattedTime = createdAtDate.format(formatString);
    return formattedTime
}
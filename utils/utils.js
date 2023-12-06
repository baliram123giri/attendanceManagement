import axios from "axios"

export const baseUrl = "http://localhost:8000/api/v1"
export const baseUrl1 = "https://api.bgtechub.com/api/v1"

export const getLocalStorageItem = (name) => {
    return JSON.parse(localStorage.getItem(name))
}

export const isDevlopment = process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://api.bgtechub.com"

export const myAxios = axios.create({
    baseURL: isDevlopment + "/api/v1",
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})



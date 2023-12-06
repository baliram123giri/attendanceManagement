export const baseUrl1 = "http://localhost:8000/api/v1"
export const baseUrl2 = "https://attendance-mangement.onrender.com/api/v1"
export const baseUrl = "https://api.bgtechub.com/api/v1"

export const getLocalStorageItem = (name) => {
    return JSON.parse(localStorage.getItem(name))
}
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

export function setValues(setValue, values) {
    for (const key in values) {
        setValue(key, values[key] === "" ? null : values[key])
    }
}

export function checkTimeLapse(time, hrs = 1) {
    try {
        const targetDate = new Date(time)
        const currentDate = new Date()
        const timeLapse = currentDate - targetDate
        const timeHoursInMiliSeconds = hrs * 60 * 60 * 1000
        if (timeLapse > timeHoursInMiliSeconds) {
            return false
        } else {
            return true
        }
    } catch (error) {
        console.log(error)
    }

}

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

export function getFiletype(b64 = "") {
    const fileType = b64?.split(";")[0]
    switch (fileType) {
        case 'data:image/jpeg':
            return "image"
        case "data:image/png":
            return "image"
        case "data:image/jpg":
            return "image"
        case "data:application/pdf":
            return "pdf"
        default:
            return false
    }
}

export const downloadImage = async (imageUrl, name) => {
    try {
        const response = await fetch(imageUrl);

        if (!response.ok) {
            throw new Error('Failed to download image');
        }

        // const contentType = response.headers.get('content-type');
        // const extension = contentType.split('/')[1];

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading image:', error.message);
    }
};

export const isJwt = (str) => {
    const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/;
    return jwtPattern.test(str);
};

function getWeekDates(dateString, result = []) {
    // Assuming the input date is in the 'MM/DD/YYYY' format
    const [month, day, year] = dateString.split('/');

    const startDate = new Date(`${year}-${month}-${day}`);

    for (let i = 7; i >= 1; i--) {
        const newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() - i + 1);

        const formattedDate = newDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        result.push(formattedDate);
    }

    return result;
}


export function getAttendance(data = [], users = [], date) {
    try {
        const weekend = getWeekDates(date)

        const finalData = users?.map(allUser => {
            const attendance = {}

            weekend.forEach(currDate => {
                if (currDate in attendance) {
                    return false
                } else {
                    attendance[currDate?.split("/").reverse().join("-")] = data?.findIndex((attendanceData) => (attendanceData.date === currDate) && (attendanceData?.studentID?.name === allUser?.name)) !== -1
                }
            })
            return {
                name: allUser?.name,
                attendance

            }
        })
        return finalData
    } catch (error) {
        console.log(error)
    }


}
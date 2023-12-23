import { githubUrlPattern, netlifyAppUrlPattern } from "@/utils/pattern"
import * as Yup from "yup"

export const addAsignments = (editId) => {
    return Yup.object().shape({
        gitUrl: Yup.string().required("Git Repository url required").matches(githubUrlPattern, "Invalid GitHub Repository URL"),
        netlifyUrl: Yup.string().required("Git Repository url required").matches(netlifyAppUrlPattern, "Invalid Netlify App URL"),
        title: Yup.string().required("Project Title required"),
        ...(editId ? {} : {
            thumbnail: Yup.mixed().required('Please upload an image').test(
                'fileType',
                'Please upload an image',
                (value) => value && value[0]?.type.startsWith('image/')
            ),
        })
    })
}
import { githubUrlPattern, netlifyAppUrlPattern } from "@/utils/pattern"
import * as Yup from "yup"

export const addAsignments = Yup.object().shape({
    gitUrl: Yup.string().required("Git Repository url required").matches(githubUrlPattern, "Invalid GitHub Repository URL"),
    netlifyUrl: Yup.string().required("Git Repository url required").matches(netlifyAppUrlPattern, "Invalid Netlify App URL"),
    title: Yup.string().required("Project Title required")
}) 
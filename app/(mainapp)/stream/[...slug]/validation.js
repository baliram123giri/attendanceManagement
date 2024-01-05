import * as yup from "yup"

export const StreamValidation = yup.object().shape({
    name: yup.string().required("Stream name is required")
})
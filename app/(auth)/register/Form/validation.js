import * as Yup from "yup"

export const loginSchema = Yup.object().shape({
    name: Yup.string().trim().required("Full Name is required!"),
    mobile: Yup.string().trim().required("mobile is required!"),
    email: Yup.string().trim().email("Invalid Email").required("Email is required!"),
    password: Yup.string().trim().required("Password is required!")
})

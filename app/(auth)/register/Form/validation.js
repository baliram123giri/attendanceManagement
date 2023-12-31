import * as Yup from "yup"

export const loginSchema = Yup.object().shape({
    name: Yup.string().trim().required("Full Name is required!"),
    mobile: Yup.string().matches(/^\d{10}$/, 'Please enter a valid 10-digit mobile number').required('Mobile number is required'),
    email: Yup.string().trim().email("Invalid Email").required("Email is required!"),
    password: Yup.string().trim().required("Password is required!")
})

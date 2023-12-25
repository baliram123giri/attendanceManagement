import * as Yup from "yup"

export const updateAccountValidation = () => {
    return Yup.object().shape({
        name: Yup.string().required("Name required"),
        email: Yup.string().email("Invalid email").required("Email required"),
        mobile: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
            .required('Mobile number is required'),
        avatar: Yup.mixed().test(
            'fileType',
            'Please upload an image',
            function (value) {
                if (value?.length > 10) return true
                // Check if the field is provided and the first file has a type starting with 'image/'
                return value?.length === 0 || value[0]?.type?.startsWith('image/')
            }
        ).optional(),
    })
}

export const updatePasswordValidation = (isRest) => {
    return Yup.object().shape({
        ...(isRest ? {} : { oldPassword: Yup.string().required("Old password required") }),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    })
}
export const addressValidation = () => {
    return Yup.object().shape({
        address: Yup.string().required("Address required"),
        state: Yup.string().required("State required"),
        city: Yup.string().required("City required"),
        pincode: Yup.string().matches(/^[0-9]{6}$/, 'Pincode number must be exactly 6 digits').required("Pincode required"),
    })
}
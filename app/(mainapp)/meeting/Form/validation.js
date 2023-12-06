import * as Yup from "yup"

export const createMeetingSchem = Yup.object().shape({
    link: Yup.string().required(),
    course: Yup.string().required(),
})
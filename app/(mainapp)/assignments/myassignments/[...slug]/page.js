import React from 'react'
import Form from './SubmitForm/Form'
import { redirect } from 'next/navigation'

const AssignmenForm = ({ params: { slug: [type, editId] } }) => {

    if (type !== "edit" && type !== "add") {
        redirect("/assignments/myassignments")
    }
    return (
        <div>
            <Form editId={(type === "edit" && editId) && editId} />
        </div>
    )
}

export default AssignmenForm
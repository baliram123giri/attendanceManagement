import React from 'react'
import Form from './Form'
import { redirect } from 'next/navigation'

const StreamPage = ({ params: { slug } }) => {
    const isRedirect = slug?.length > 2 || (slug[0] !== "add" && slug[0] !== "edit")
    if (isRedirect) return redirect("/stream")
    if (slug[0] === "add" && slug?.length > 1) return redirect("/stream")
    return (
        <div>
            <Form editId={slug[1]} />
        </div>
    )
}

export default StreamPage
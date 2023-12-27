import { isJwt } from '@/utils/utils'
import { redirect } from 'next/dist/server/api-utils'
import React from 'react'
import ActivateAccountError from './ActivateAccountError'

const page = ({ params: { slug: token } }) => {
    if (!isJwt(token)) {
        redirect("/")
    }
    return <ActivateAccountError token={token} />
}

export default page
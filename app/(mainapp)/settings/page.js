import React from 'react'
import AccountInfo from './AccountInfo/AccountInfo'
import PasswordChange from './AccountInfo/PasswordChange'
import AddressInfo from './AccountInfo/AddressInfo'
import { myAxios } from '@/utils/utils'
const stateData = async () => {
    const { data } = await myAxios.get(`/data/state/list`)
    return data
}
const Settings = async () => {
    const stateOptions = await stateData()

    return (
        <section className='bg-white p-4 flex justify-between  items-stretch flex-wrap'>
            <AccountInfo />
            <AddressInfo stateOptions={stateOptions} />
            <PasswordChange />
        </section>
    )
}

export default Settings
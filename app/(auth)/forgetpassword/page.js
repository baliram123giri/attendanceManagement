import React from 'react'
import SkewComp from '@/components/SkewCom/SkewComp'
import Form from './Form'

const Forgetpassword = () => {
    return (
        <section className='bg-main-app-primary relative w-[96%] sm:w-[55%] lg:w-[25%] text-white mx-auto p-4 rounded-md'>
            <SkewComp title="Forget Password" />
            <div className='pt-[60px]'>
                <Form isRest/>
            </div>

        </section>
    )
}

export default Forgetpassword
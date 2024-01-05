import React from 'react'
import { streamtList } from './services'
import AddBtn from '@/components/Buttons/AddBtn'
import ActionStream from './ActionStream'

const Streams = async () => {
    const StreamData = await streamtList()
    return (
        <section>
            {/* <Form /> */}
            <AddBtn title={"Stream"} path={"/stream/add"} />
            <div className='bg-white py-4'>
                <table className='w-full text-xs '>
                    <thead className='bg-gray-100 shadow h-10'>
                        <tr>
                            <th className='w-20 text-start ps-4'>Sr</th>
                            <th className='w-56 text-start'>ID</th>
                            <th className='text-start'>Name</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            StreamData && StreamData.map(({ id, name }, index) => {

                                return <tr key={id} className='py-3 h-10 border-b'>
                                    <td className='ps-4'>{index + 1}</td>
                                    <td >{id}</td>
                                    <td>  <h6>{name}</h6></td>
                                    <td>
                                        <ActionStream streamId={id} />
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Streams
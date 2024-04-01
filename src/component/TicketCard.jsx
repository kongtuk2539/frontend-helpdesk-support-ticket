import { useState, useEffect } from 'react'

function TicketCard({ updateTicket, data }) {
    const [statusColor, setStatusColor] = useState('bg-purple')
    const statusOrder = [
        {
            value: 'Pending',
            color: 'bg-purple'
        },
        {
            value: 'Accepted',
            color: 'bg-green-500'
        },
        {
            value: 'Resolved',
            color: 'bg-orange-400'
        },
        {
            value: 'Rejected',
            color: 'bg-red-400'
        },
    ]

    function getColor(value) {
        const filteredStatus = statusOrder.filter(status => status.value === value);
        return filteredStatus.length > 0 ? filteredStatus[0].color : 'bg-purple';
    }

    useEffect(() => {
        setStatusColor(getColor(data.ticket_status));
    }, []);

    return (
        <>
            <div className='font-orbitron shadow-lg border-2 flex flex-col shadow-fuchsia-200 gap-4 border-purple rounded-lg px-6 py-4 w-[400px] h-[490px]'>
                <div className='head flex justify-between text-lg'>
                    <div className='title flex flex-col'>
                        <h3 className='text-gray-400'>Title</h3>
                        <p>{data.ticket_title}</p>
                    </div>
                </div>

                <div className='body flex justify-between text-lg h-28 border-b-2'>
                    <div className='title flex flex-col'>
                        <h3 className='text-gray-400'>Description</h3>
                        <p className='overflow-auto break-all'>{data.ticket_description}</p>
                    </div>
                </div>

                <div className='body flex justify-between text-lg h-28 border-b-2'>
                    <div className='title flex flex-col'>
                        <h3 className='text-gray-400'>Contact Information</h3>
                        <p className='overflow-auto break-all'>{data.ticket_contact}</p>
                    </div>
                </div>

                <div className='footer flex justify-between text-lg'>
                    <div className='timeCreate'>
                        <h3 className='text-gray-400'>Time Create</h3>
                        <p>{data.ticket_time_create}</p>
                    </div>
                    <div className='timeUpdate'>
                        <h3 className='text-gray-400'>Time Update</h3>
                        <p>{data.ticket_time_update}</p>
                    </div>
                </div>

                <div className='flex flex-row-reverse justify-between '>
                    <div className='cursor-pointer mt-4 flex justify-center items-center w-2/4 h-10 rounded-lg font-bold 
                    text-white bg-gradient-to-l from-indigo-400 bg-deep-purple px-6 drop-shadow-lg hover:bg-[#9F73FF]' onClick={() => updateTicket(data)}>
                        <button>Update</button>
                    </div>
                    <div className={`mt-4 drop-shadow-lg flex justify-center items-center w-1/4 h-10  rounded-lg font-bold text-white ${statusColor}`}>
                        <p>{data.ticket_status}</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default TicketCard
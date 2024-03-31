import { useEffect, useState } from 'react'
import TicketCard from '../component/TicketCard';
import CreateandUpdateTicket from '../component/CreateandUpdateTicket';
import { GetTicket } from '../service/GetTicket';
import { CreateTicket } from '../service/CreateTicket';
import { UpdateTicket } from '../service/UpdateTicket';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function Home() {
    const [isShowDialogCreateandUpdate, setIsShowDialogCreateandUpdate] = useState(false);
    const [data, setData] = useState(null);
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [currentData, setCurrentData] = useState(null);
    const [statusUpdate, setStatusUpdate] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("status");

    const filterItems = [
        { value: 'status', label: 'Status' },
        { value: 'lastestUpdate', label: 'Lastest Update' },
        { value: 'pending', label: 'Pending' },
        { value: 'accepted', label: 'Accepted' },
        { value: 'resolved', label: 'Resolved' },
        { value: 'rejected', label: 'Rejected' },
    ];


    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const totalPages = Math.ceil(ticketData.length / itemsPerPage);
    // const currentData = ticketData.slice(startIndex, endIndex);

    const statusOrder = ['Pending', 'Accepted', 'Resolved', 'Rejected'];

    const sortData = (data) => {
        let sortedTickets = null;

        if (filter == "status") {
            sortedTickets = sortTicketsByStatus(data);
        } else if (filter == "lastestUpdate") {
            sortedTickets = sortTicketsByUpdateTime(data);
        } else if (filter == "pending") {
            sortedTickets = sortStatusTicketsByUpdateTime(data, "Pending");
        } else if (filter == "accepted") {
            sortedTickets = sortStatusTicketsByUpdateTime(data, "Accepted");
        } else if (filter == "resolved") {
            sortedTickets = sortStatusTicketsByUpdateTime(data, "Resolved");
        } else if (filter == "rejected") {
            sortedTickets = sortStatusTicketsByUpdateTime(data, "Rejected");
        }


        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setTotalPages(Math.ceil(sortedTickets.length / itemsPerPage));
        setCurrentData(sortedTickets.slice(startIndex, endIndex));
    }

    const snackbar = (message, status) => {
        if (status == 1) {
            return toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const parseDate = (dateString) => {
        const parts = dateString.split(' ')[0].split('/');
        const timeParts = dateString.split(' ')[1].split(':');
        // Note: Months are zero-based in JavaScript Date objects
        return new Date(parts[2], parts[1] - 1, parts[0], timeParts[0], timeParts[1], timeParts[2]);
    };

    const sortTicketsByUpdateTime = (data) => {
        const sortedTickets = [...data].sort((a, b) => {
            // Parse date strings and convert to Date objects
            const dateA = parseDate(a.ticket_time_update);
            const dateB = parseDate(b.ticket_time_update);
            // Compare Date objects
            return dateB - dateA;
        });
        setCurrentData(sortedTickets);
        return sortedTickets;
    };

    const sortTicketsByStatus = (data) => {
        const sortedTickets = [...data].sort((a, b) => statusOrder.indexOf(a.ticket_status) - statusOrder.indexOf(b.ticket_status));
        setCurrentData(sortedTickets);
        return sortedTickets;
    }

    const sortStatusTicketsByUpdateTime = (data, status) => {
        // Splitting tickets into "Pending" and "Non-Pending"
        const ststusTickets = data.filter(ticket => ticket.ticket_status === status);

        // Sorting only "Pending" tickets by update time
        ststusTickets.sort((a, b) => {
            const dateA = parseDate(a.ticket_time_update);
            const dateB = parseDate(b.ticket_time_update);
            return dateB - dateA;
        });

        setCurrentData(ststusTickets);
        return ststusTickets;
    };

    useEffect(() => {

        const GetTicketData = async () => {
            setIsLoading(true);
            const response = await GetTicket();
            setIsLoading(false);
            if (response.message == "สำเร็จ") {
                const data = [...response.data].sort((a, b) => b.ticket_id - a.ticket_id);
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                setTotalPages(Math.ceil(data.length / itemsPerPage));
                setCurrentData(data.slice(startIndex, endIndex));
                sortData(data);
            }
        }

        GetTicketData();



    }, [currentPage, statusUpdate, filter]);


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const [value, setValue] = useState("status");

    const updateTicket = (data) => {
        setIsShowDialogCreateandUpdate(true);
        setData(data);
    }




    const CreateTicketData = async (data) => {
        let response = await CreateTicket(data);
        if (response.message == "บันทึกข้อมูลสำเร็จ") {
            setStatusUpdate(prevStatus => prevStatus + 1);
            snackbar("Create Successfully", 1);
            return
        }
        snackbar("Error There's something wrong.", 0);
    }

    const UpdateTicketData = async (data, id) => {
        let response = await UpdateTicket(data, id);
        if (response.message == "บันทึกข้อมูลสำเร็จ") {
            setStatusUpdate(prevStatus => prevStatus + 1);
            snackbar("Update Successfully", 1);
            return
        }
        snackbar("Error There's something wrong.", 0);
    }


    return (
        <div className='bg-white '>
            <div className='lg:mx-[220px] p-8'>
                <div className='flex flex-wrap gap-6 justify-center sm:justify-end '>
                    <div className='border-2 border-deep-purple px-6 p-4 h-auto lg:w-[850px] rounded-md radio flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-6 lg:gap-0 sm:justify-start xl:justify-between items-start sm:items-center'>
                        <p className='font-roboto-mono font-bold text-lg'>Filter</p>
                        {filterItems.map(item => (
                            <div className='font-roboto-mono flex flex-wrap gap-2 mx-2' key={item.value} onClick={() => setFilter(item.value)}>
                                <input
                                    name='filter'
                                    type='radio'
                                    value={item.value}
                                    id={item.value}
                                    checked={value === item.value}
                                    onChange={e => setValue(e.target.value)}
                                />
                                <label htmlFor={item.value} className='cursor-pointer'>
                                    {item.label}
                                </label>
                            </div>
                        ))}
                    </div>
                    <button type='button'
                        className='w-full sm:w-auto rounded-lg font-bold text-white bg-purple px-6 hover:bg-[#9F73FF]'
                        onClick={() => setIsShowDialogCreateandUpdate(!isShowDialogCreateandUpdate)}>Create Ticket</button>
                </div>

                {isLoading ?
                    <div className='flex justify-center items-center h-[600px]'>
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
                    </div>
                    :
                    <div className='cardSection mt-8 flex-wrap flex justify-center lg:p-4 gap-6'>
                        {currentData ?
                            currentData.map(item => (
                                <TicketCard updateTicket={updateTicket} data={item} key={item.ticket_id} />
                            ))
                            : null}

                        {/* {isShowDialogCreateandUpdate && !data ? <CreateandUpdateTicket setIsShowDialogCreateandUpdate={setIsShowDialogCreateandUpdate} setData={setData} statusUpdate={"Accepted"} /> : null} */}
                        {isShowDialogCreateandUpdate ? <CreateandUpdateTicket setIsShowDialogCreateandUpdate={setIsShowDialogCreateandUpdate} setData={setData} data={data} CreateTicketData={CreateTicketData} UpdateTicketData={UpdateTicketData} /> : null}
                    </div>}

                <div className="mt-4 flex justify-center">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`border-2 border-deep-purple mx-2 p-2 font-roboto-mono font-bold text-lg ${currentPage === index + 1 ? 'bg-purple text-white' : 'bg-white'
                                } hover:bg-[#9F73FF]
                            rounded`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            <ToastContainer />
        </div >
    )
}

export default Home
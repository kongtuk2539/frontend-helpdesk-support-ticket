import { useEffect, useState, useRef } from 'react'
import { Dropdown, Button } from "antd";
import Dialog from './Dialog';
import Spinloading from './Spinloading';



function CreateandUpdateTicket({
    setIsShowDialogCreateandUpdate,
    statusUpdate,
    setData,
    data,
    CreateTicketData,
    UpdateTicketData }) {
    const [status, setStatus] = useState("Pending")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isUpdate, setIsUpdate] = useState(false)
    const [id, setId] = useState(null)
    const [contactInformation, setContactInformation] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const overlayRef = useRef(null);
    const [showDialogConfirm, setShowDialogConfirm] = useState(false);

    const [formErrors, setFormErrors] = useState({
        title: "",
        description: "",
        contactInformation: "",
    });

    const handleClick = (e) => {
        if (e.target === overlayRef.current) {
            setIsShowDialogCreateandUpdate(false);
        }
    };

    useEffect(() => {
        if (statusUpdate) {
            setStatus(statusUpdate)
        }

        if (data) {
            setTitle(data.ticket_title);
            setDescription(data.ticket_description);
            setContactInformation(data.ticket_contact);
            setStatus(data.ticket_status);
            setId(data.ticket_id);
            setIsUpdate(true);
        }

        return () => {
            setData(null);
        }
    }, [data, setData, statusUpdate]);

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        console.log(`Valid Title => ${!title.trim()}`)
        console.log(`Valid Description => ${description.trim().length < 2}`)
        console.log(`Valid ContactInformation => ${contactInformation.trim().length < 2}`)
        console.log(`Valid ContactInformation => ${contactInformation.trim().length > 150}`)
        if (!title.trim() || title.trim().length > 50) {
            errors.title = "Please enter your title";
            isValid = false;
        }
        if (description.trim().length < 2 || description.trim().length > 250) {
            errors.description = "Please enter your description";
            isValid = false;
        }
        if (contactInformation.trim().length < 2 || contactInformation.trim().length > 150) {
            errors.contactInformation = "Please enter your contactInformation";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };


    const submit = async () => {
        const isValid = validateForm();
        const data = {
            "ticket_title": title,
            "ticket_description": description,
            "ticket_contact": contactInformation,
            "ticket_status": status
        }

        if (!isValid) {
            return;
        }

        setIsLoading(true)

        if (!isUpdate) {
            await CreateTicketData(data);
            setIsShowDialogCreateandUpdate(false);
            setIsLoading(false)
            return

        }

        if (isUpdate) {
            await UpdateTicketData(data, id);
            setIsShowDialogCreateandUpdate(false);
            setIsLoading(false)
            return
        }

    }



    const items = [
        {
            key: '1',
            label: (
                <a onClick={() => setStatus('Pending')}>
                    Pending
                </a>
            ),
            value: 'Pending'
        },
        {
            key: '2',
            label: (
                <a onClick={() => setStatus('Accepted')}>
                    Accepted
                </a>
            ),
            value: 'Accepted'
        },
        {
            key: '3',
            label: (
                <a onClick={() => setStatus('Resolved')}>
                    Resolved
                </a>
            ),
            value: 'Resolved'
        },
        {
            key: '4',
            label: (
                <a onClick={() => setStatus('Rejected')}>
                    Rejected
                </a>
            ),
            value: 'Rejected'
        },
    ];

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-op90 flex items-center justify-center z-50 " onClick={handleClick} ref={overlayRef}>
            <div className='bg-white bg-gradient-to-t from-slate-200 w-[400px] sm:w-[480px] lg:w-[580px] h-[760px] flex flex-col rounded-lg drop-shadow-2xl'>
                <div className='flex justify-end p-6'>
                    <button onClick={() => setIsShowDialogCreateandUpdate(false)} className=' w-8 rounded'>❌</button>
                </div>
                <h1 className='text-center font-roboto-mono font-bold text-2xl text-purple'>{isUpdate ? 'Ticket Update' : 'Ticket Create'}</h1>
                <div className='input flex flex-col justify-center items-center mt-6 gap-4 font-orbitron text-lg overflow-auto'>
                    <div className='flex flex-col w-3/4 h-[90px]'>
                        <label htmlFor="tile">
                            Title
                        </label>
                        <input type="text"
                            className={`p-2 border-2 rounded-md h-8' onChange={(e) => setTitle(e.target.value)
                            ${formErrors.title == "Please enter your title" || title.length > 50 ? 'border-red-400' : 'border-purple'}`}
                            placeholder='Please enter your title'
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                                setFormErrors(e => ({
                                    ...e,
                                    "title": ""
                                }));
                            }}
                        />
                        {formErrors.title == "Please enter your title" && title.length < 50 ? <p className='text-red-400 text-sm'>{formErrors.title}</p> : null}
                        {title.length > 50 ? <p className='text-red-400 text-sm'>{'you do not enter characters more than 50'}</p> : null}
                    </div>

                    <div className='flex flex-col w-3/4 h-[150px]'>
                        <label htmlFor="description">
                            <p className='flex items-end justify-between'><span>Description</span> <span className='text-sm text-gray-400'>{`${description.length} / 250`}</span></p>
                        </label>
                        <textarea className={`p-2 border-2 rounded-md id="description" name="description" h-[100px] 
                        ${formErrors.description == "Please enter your description" || description.length > 250 ? 'border-red-400' : 'border-purple'}`}
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                                setFormErrors(e => ({
                                    ...e,
                                    "description": ""
                                }));
                            }}
                            placeholder='Please enter your description less than 2 and more than 250 characters' />
                        {formErrors.description == "Please enter your description" && description.length < 250 ? <p className='text-red-400 text-sm'>{formErrors.description}</p> : null}
                        {description.length > 250 ? <p className='text-red-400 text-sm'>{'you do not enter characters less than 2 and more than 250'}</p> : null}
                    </div>

                    <div className='flex flex-col w-3/4 h-[150px]'>
                        <label htmlFor="contactInformation">
                            <p className='flex items-end justify-between'><span>Contact Information</span> <span className='text-sm text-gray-400'>{`${contactInformation.length} / 150`}</span></p>
                        </label>
                        <textarea className={`p-2 border-2 rounded-md id="contactInformation" name="contactInformation" h-[100px]
                        ${formErrors.contactInformation == "Please enter your contactInformation" || contactInformation.length > 150 ? 'border-red-400' : 'border-purple'}`}
                            value={contactInformation}
                            onChange={(e) => {
                                setContactInformation(e.target.value)
                                setFormErrors(e => ({
                                    ...e,
                                    "contactInformation": ""
                                }));
                            }}
                            placeholder='Please enter your contactInformation less than 2 and more than 150 characters' />
                        {formErrors.contactInformation == "Please enter your contactInformation" && contactInformation.length < 150 ? <p className='text-red-400 text-sm'>{formErrors.contactInformation}</p> : null}
                        {contactInformation.length > 150 ? <p className='text-red-400 text-sm'>{'you do not enter characters less than 2 and more than 150'}</p> : null}
                    </div>

                    <div className='flex justify-end w-3/4 h-[60px]'>
                        <Dropdown className='w-[150px] text-white bg-purple px-6' menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                            <Button>{status}</Button>
                        </Dropdown>
                    </div>

                    <div className='w-3/4 mt-4 flex gap-6'>
                        <button type='button'
                            className='w-1/3 rounded-lg font-bold text-white bg-red-600 px-6 hover:bg-red-400'
                            onClick={() => setIsShowDialogCreateandUpdate(false)}
                        >Close</button>

                        <button type='button'
                            className={`${isUpdate ? 'bg-green-600 hover:bg-green-500' : 'bg-purple hover:bg-[#9F73FF]'} rounded-lg font-bold text-white w-3/4 px-6 `}
                            onClick={() => setShowDialogConfirm(true)}
                        >{isUpdate ? 'Update' : 'Create'}</button>
                    </div>
                    {showDialogConfirm ? <Dialog submit={submit} message={isUpdate ? 'Updated' : 'Created'} setShowDialogConfirm={setShowDialogConfirm} /> : null}
                </div>
            </div>
            {isLoading ? <Spinloading /> : null}
        </div>
    )
}

export default CreateandUpdateTicket
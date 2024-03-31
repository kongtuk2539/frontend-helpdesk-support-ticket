function Dialog({ message, setShowDialogConfirm, submit }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-op90 flex items-center justify-center z-50 ">
            <div className='bg-white bg-gradient-to-t from-slate-400 w-[400px] h-[260px] flex flex-col rounded-lg drop-shadow-2xl
            justify-center items-center gap-6 font-roboto-mono'>
                <h1 className='font-bold'>Confirm {message}</h1>
                <p>Do you confirm to {message}?</p>
                <div className='mt-6 flex gap-6'>
                    <button type='button'
                        className='rounded-lg font-bold text-white bg-red-600 px-6 hover:bg-red-400'
                        onClick={() => {
                            setShowDialogConfirm(false);
                        }}
                    >Close</button>
                    <button type='button'
                        className='rounded-lg font-bold text-white bg-purple hover:bg-[#9F73FF] px-6'
                        onClick={() => {
                            setShowDialogConfirm(false);
                            submit();
                        }}
                    >Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default Dialog
import icon from '../assets/image/icon.png'

function Header() {
    return (
        <div className="w-full h-[120px] bg-gradient-to-l from-indigo-400 bg-deep-purple drop-shadow-lg">
            <div className='pt-3 px-8 flex items-center gap-2'>
                <img className='w-28 rounded-full filter invert' src={icon} alt="" />
                <h1 className='font-roboto-mono text-white text-4xl'>Help Support</h1>
            </div>
        </div>
    )
}

export default Header
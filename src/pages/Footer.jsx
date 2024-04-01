import linkedin from '../assets/image/linkedin.png';
import email from '../assets/image/email.png'
import phone from '../assets/image/phone.png'

function Footer() {
    return (
        <div className="w-full h-[110px] bg-gradient-to-r from-indigo-400 bg-deep-purple drop-shadow-lg p-2">
            <div className='pt-3 px-8 flex items-center gap-2'>
                <img className='w-8' src={email} alt="" />
                <h1 className='font-roboto-mono text-white text-xl'>t.kongtuk@gmail.com</h1>
            </div>
            <div className='pt-3 px-8 flex items-center gap-2'>
                <a target='_blank' href="https://www.linkedin.com/in/tho-kongtuk/"><img className='w-8' src={linkedin} alt="" /></a>
                <a target='_blank' href="https://www.linkedin.com/in/tho-kongtuk/" className='font-roboto-mono text-white text-xl'>Tho Kongtuk</a>
            </div>
        </div>
    )
}

export default Footer
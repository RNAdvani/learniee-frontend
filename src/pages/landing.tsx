import { Button } from '@/components/ui/button'
import {  useNavigate } from 'react-router-dom'

const LandingPage = () => {

    const navigate = useNavigate() 
  return (
    <div className='flex flex-col md:flex-row bg-[#fff] h-screen w-full'>
       <div className='h-full w-full flex flex-col justify-center p-8 texce'>
            <h1 className='flex gap-2 font-RedHatText font-semibold text-[64px] text-gray-700'>Stay <span className='font-quote'>Cool</span> With <br />
            Social Chat!
            </h1>
            <div>
                <p className='pl-5'>
                    Anyone can join the chat,just share the link with them and start chatting.
                </p>
            </div>
           <div>
            <Button variant='default' onClick={()=>{
                navigate('/chat')
            }} className='mt-4 h-fit px-8 py-4 rounded-[2rem]'>Get Started</Button>
           </div>
       </div>
       <div className=''>
              <img src='/image.png' alt="landing" className='h-full w-full object-cover'/>
       </div>
    </div>
  )
}

export default LandingPage
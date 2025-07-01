import React from 'react'
import hand_icon from '../../assets/hand_icon.png'
import hero_image from '../../assets/hero_image.png'
import arrow_icon from '../../assets/arrow.png'

function Home() {
  return (
    <div className='h-screen flex w-full bg-[linear-gradient(180deg,_#fde1ff,_#e1ffea22_60%)]'>
        <div className="flex-[1] flex flex-col justify-center gap-[20px] pl-[180px] lh-[1.1]">
            <h2 className='text-[#090909] text-[26px] font-bold hidden'>NEW ARRIVALS ONLY</h2>
            <div className='wrap flex flex-col'>
                <div className="flex items-center gap-[20px]">
                    <p className='text-[#171717] text-[100px] font-bold uppercase'>New</p>
                    <img src={hand_icon} alt="hand_icon" className='w-[105px]' />
                </div>
                <p className='text-[#171717] text-[100px] font-bold uppercase'>collections</p>
                <p className='text-[#171717] text-[100px] font-bold uppercase'>for everyone</p>
            </div>
            <a href={"/products"} className="flex justify-center items-center gap-[15px] w-[310px] h-[70px] rounded-[75px] mt-[30px] bg-red-400 text-white text-[22px] font-medium cursor-pointer">
                <div>Latest Collection</div>
                <img src={arrow_icon} alt="" />
            </a>
        </div>
        <div className="hero-right">
            <img src={hero_image} alt="" />
        </div>
    </div>
  )
}

export default Home
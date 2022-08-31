import React from 'react'
import image from '../../assets/error.png'
const Error404 = () => {
  return (
    <div>
            <div className='bg-[#f6f5ff] px-4 pt-5 pb-4 sm:p-6 sm:pb-4 '>
            <div className=' px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-w-4xl mx-auto'>
              <p className='text-2xl font-bold'>404 Not Found</p>
              <p className='text-md '>Home . Pages . 404 Not Found</p>
            </div>
</div>
            <img
                  src={image}
                  alt={"error"}
                  className="hero container max-w-screen-md mx-auto pb-10 flex justify-center"
                />
    </div>
  )
}

export default Error404
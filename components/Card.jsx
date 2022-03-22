import React from 'react'

const Card = ({children}) => {
  return (
    <div className="card text-white font-semibold text-3xl lg:text-5xl w-[88%]  lg:max-w-[50%] mx-auto mt-6 md:mb-3 md:mt-8 py-16 px-4 text-center rounded-3xl box-border" id="balance">
        {children}
    </div>
  )
}

export default Card
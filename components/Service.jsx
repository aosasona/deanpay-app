/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

const Service = ({link, item, type, code}) => {

    var to = "/pay/"+type+"/"+code

  return (
    <>
    <Link href={to}>
        <figure className="p-2 hover:bg-slate-100 hover:rounded-xl focus:bg-slate-100">
        <img src={link} className="w-10 h-10 lg:w-20 lg:h-20 bg-white object-contain rounded-lg border-4 border-white drop-shadow-lg cursor-pointer" alt="service"/>
        <figcaption className="text-center mt-3 text-slate-600 text-xs lg:text-sm font-medium">{item.toUpperCase()}</figcaption>
        </figure>
    </Link>
    </>
  )
}

export default Service
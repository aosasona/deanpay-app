
import { TiArrowDownThick, TiArrowUpThick } from 'react-icons/ti';

import {BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';
import Link from 'next/link';

const ListCard = ({children, inFlow, txRef}) => {

  const transactionLink = `/transaction/view/${txRef}`

  return (
    <Link href={transactionLink} passHref>
    <div className="list-card text-slate-600 bg-slate-100 font-normal text-sm md:text-lg text-left w-[95%] lg:w-3/5 mx-auto my-2 md:my-3 py-4 px-3 lg:px-6 rounded-2xl box-border cursor-pointer grotesk">
        <div className="flex flex-row items-center">
        {inFlow === true ? <span className="text-green-600 text-3xl bg-green-200 rounded-[50%] py-1 px-2"><BsArrowDownShort/></span> : <span className="text-red-600 text-3xl bg-red-200 rounded-[50%] py-1 px-2"><BsArrowUpShort/></span> }
        <div className="flex flex-col justify-end mx-4 w-full">
        {children}
        </div>
        </div>
    </div></Link>
  )
}

ListCard.defaultProps = {
    inFlow: false,
}

export default ListCard
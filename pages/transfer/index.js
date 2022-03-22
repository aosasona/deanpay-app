import { useRouter } from 'next/router'
import Meta from '@/components/Meta'
import { BsFillLightningFill, BsFillCreditCardFill } from "react-icons/bs"
import Back from '@/components/Back'
import NavBottom from '@/components/NavBottom'

const Transfer = () => {
  const router = useRouter()

  //Transfer to a DeanPay user
  const localTransfer = () => {
    router.push("/transfer/local")
  }
  const bankTransfer = () => {
    router.push("/transfer/bank")
  }

  return (
    <>
    <Meta title="Transfer Money" desc="Send money easily and fast!" />
    <div className="w-[95%] md:w-4/5 lg:3/5 mx-auto">
      <h1 className="text-3xl md:text-5xl text-slate-900 mt-16 px-3 grotesk">Transfer Money</h1>
      <h2 className="text-[11px] md:text-sm text-slate-500 mt-4 px-4">💸 Send money fast and easily in a few clicks to any DeanPay wallet for <b>FREE</b> or a Naira bank account with <b>NO HIDDEN</b> charges!</h2>

      <div className="w-[95%] mt-10 mx-auto">
        <button className="w-full bg-blue-100 flex items-center py-4 px-2 my-5 rounded-2xl hover:bg-white" onClick={localTransfer}>
          <span className="bg-blue-300 text-[#2e63c0] text-xl mx-3 p-2 rounded-[50%]"><BsFillLightningFill/></span> 
          <span className="mx-2 md:mx-5 font-medium text-sm md:text-lg text-[#2e63c0]">To a DeanPay wallet</span>
        </button>

        {/* To a bank account */}
        <button className="w-full bg-blue-100 flex items-center py-4 px-2 my-5 rounded-2xl hover:bg-white" onClick={bankTransfer}>
          <span className="bg-blue-300 text-[#2e63c0] text-xl mx-3 p-2 rounded-[50%]"><BsFillCreditCardFill/></span> 
          <span className="mx-2 md:mx-5 font-medium text-sm md:text-lg text-[#2e63c0]">To a NGN bank account</span>
        </button>
      </div>
    </div>
    <NavBottom />
    </>
  )
}

export default Transfer
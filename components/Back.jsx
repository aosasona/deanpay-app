import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";

const Back = ({url}) => {
  return (
    <div className="w-[90%] flex justify-between mt-4 mb-6">
          <div className="grotesk flex items-center text-sm font-medium text-[#2e63c0] hover:text-blue-700 py-2 space-x-1">
            <FaChevronLeft /> <Link href={url}>Back</Link>
          </div>
        </div>
  )
}

export default Back
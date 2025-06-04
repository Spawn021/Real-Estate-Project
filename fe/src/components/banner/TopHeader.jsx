import withRouter from '@/hocs/withRouter'
import clsx from 'clsx'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'
function TopHeader({ location }) {
  return (
    <div
      className={twMerge(
        clsx(
          'h-[85px] text-white border-b border-main-400 w-full bg-transparent z-50 fixed px-[100px] py-[26px] flex items-center justify-between',
        ),
        location.pathname !== '/' && 'bg-main-700',
      )}
    >
      <div className="flex items-center gap-2">
        <AiOutlineMail />
        <span>
          <span>Email us at: </span>
          <span className="text-gray-300">example@gmail.com</span>
        </span>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-xl text-gray-300 ">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaLinkedinIn />
        </div>
        <div className="flex items-center pl-6 border-l border-main-400">
          <span className="flex items-center gap-2">
            <AiOutlinePhone className="text-xl" />
            <span className="text-gray-300">123-4567890</span>
          </span>
        </div>
      </div>
    </div>
  )
}

const TopHeaderWithRouter = withRouter(TopHeader)
export default TopHeaderWithRouter

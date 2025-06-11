import withRouter from '@/hocs/withRouter'
import { useUserStore } from '@/store/useUserStore'
import clsx from 'clsx'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'
import { FaRegUser } from 'react-icons/fa'
import { Fragment, useEffect, useRef, useState } from 'react'
import { menuItems } from '@/utils/constants'
import { Link } from 'react-router-dom'
function TopHeader({ location }) {
  const { current, logout } = useUserStore()
  const optionsBox = useRef(null)
  const [isShowMenu, setIsShowMenu] = useState(false)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!optionsBox.current.contains(e.target)) {
        setIsShowMenu(false)
      } else {
        setIsShowMenu(true)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
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
        {current && (
          <div
            ref={optionsBox}
            onClick={() => setIsShowMenu(!isShowMenu)}
            className="flex relative items-center cursor-pointer rounded-md hover:bg-overlay-40 px-6 border-l border-main-400 gap-4 z-[100]"
          >
            <span className="flex items-center flex-col gap-2">
              <span className="text-gray-300">{current?.name}</span>
              <span className="text-gray-300">ID: #{current?.id.slice(0, 6)}</span>
            </span>

            {current?.avatar ? (
              <img
                src={current.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full ml-2"
              />
            ) : (
              <FaRegUser className="text-gray-300 w-8 h-8" />
            )}
            <div
              className={clsx(
                'absolute top-16 right-0 bg-white text-black rounded-md shadow-lg flex flex-col border py-1 w-[180px] ',
                isShowMenu ? 'block' : 'hidden',
              )}
            >
              {menuItems.map((item) => (
                <Fragment key={item.id}>
                  {current?.userRoles.some((role) => role.roleCode === item.code) && (
                    <Link
                      className="hover:bg-gray-200 px-4 py-2 hover:text-main-700 hover:font-semibold "
                      to={item.path}
                      key={item.id}
                    >
                      <span className="whitespace-nowrap">{item.name}</span>
                    </Link>
                  )}
                </Fragment>
              ))}
              <span
                onClick={() => logout()}
                className="hover:bg-gray-200 px-4 py-2 cursor-pointer hover:text-main-700 hover:font-semibold"
              >
                Logout
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const TopHeaderWithRouter = withRouter(TopHeader)
export default TopHeaderWithRouter

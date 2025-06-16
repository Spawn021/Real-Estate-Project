import { customerSidebar } from '@/utils/constants'
import clsx from 'clsx'
import { Link, NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { useState } from 'react'
import { IoReturnUpBack } from 'react-icons/io5'
import { useUserStore } from '@/store/useUserStore'
import { FaRegUser } from 'react-icons/fa6'
const CustomerSidebar = () => {
  const [activeTab, setActiveTab] = useState([])
  const { current } = useUserStore()
  const toggleTab = (id) => {
    if (activeTab.includes(id)) {
      setActiveTab(activeTab.filter((tabId) => tabId !== id))
    } else {
      setActiveTab([...activeTab, id])
    }
  }
  return (
    <div className="flex h-screen w-full flex-col ">
      <div className="w-full flex flex-col items-center justify-center">
        {current?.avatar ? (
          <img
            src={current.avatar}
            alt="avatar"
            className="w-28 h-28 rounded-full ml-2 mt-5"
          />
        ) : (
          <FaRegUser className="text-gray-300 w-28 h-28 mt-5" />
        )}
        <h1 className="text-gray-300 text-lg mt-2">{current?.name}</h1>
        <span className="text-gray-400 text-sm">Phone: {current?.phone}</span>
        <span className="text-sm text-gray-400">
          {current?.userRoles?.map((el) => el.roleName.value)?.join(' / ')}
        </span>
      </div>
      <div className="flex flex-col flex-1 justify-between ">
        <div className="mt-8">
          {customerSidebar.map((item) => (
            <div key={item.id} className="mb-1 flex justify-center items-center ">
              {item.type === 'SINGLE' ? (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    twMerge(
                      clsx(
                        'flex items-center text-gray-300 hover:text-white w-full px-4 py-2 hover:bg-main-700 hover:border-r-4 border-orange-700',
                        isActive && 'text-white bg-main-700 border-r-4',
                      ),
                    )
                  }
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </NavLink>
              ) : (
                <div className="flex flex-col items-center w-full">
                  <div
                    onClick={() => toggleTab(item.id)}
                    className="flex items-center justify-between w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-main-700 cursor-pointer"
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-2 text-gray-200">{item.name}</span>
                    </div>
                    <div className="text-gray-200 text-xl">
                      {activeTab.includes(item.id) ? (
                        <MdOutlineKeyboardArrowUp />
                      ) : (
                        <MdOutlineKeyboardArrowDown />
                      )}
                    </div>
                  </div>
                  {activeTab.includes(item.id) && (
                    <div className="flex flex-col gap-1 w-full mt-1">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.id}
                          to={child.path}
                          className={({ isActive }) =>
                            twMerge(
                              clsx(
                                'flex items-center text-gray-300 hover:text-white w-full px-4 py-2 hover:bg-main-700 hover:border-r-4 border-orange-700',
                                isActive && 'text-white bg-main-700 border-r-4',
                              ),
                            )
                          }
                        >
                          <div className="ml-4">{child.icon}</div>
                          <span className="ml-2">{child.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-auto mb-4 w-full">
          <Link
            to="/"
            className="flex items-center text-gray-300 hover:text-white w-full px-4 py-2 gap-2 hover:bg-main-700"
          >
            <IoReturnUpBack className="text-xl" />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CustomerSidebar

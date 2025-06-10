import { adminSidebar } from '@/utils/constants'
import clsx from 'clsx'
import { Link, NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { useState } from 'react'
import { IoReturnUpBack } from 'react-icons/io5'
const AdminSidebar = () => {
  const [activeTab, setActiveTab] = useState([])
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
        <img src="/logo.png" alt="logo" className="w-3/5 object-contain cursor-pointer" />

        <div className="text-gray-200 italic">Admin workspace</div>
      </div>
      <div className="flex flex-col flex-1 justify-between ">
        <div className="mt-8">
          {adminSidebar.map((item) => (
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

export default AdminSidebar

import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const PaginationItem = ({ content, onClick, isActive }) => {
  if (Number.isInteger(content)) {
    return (
      <div
        onClick={onClick}
        className={twMerge(
          clsx(
            'w-10 h-10 flex items-center justify-center bg-main-50 rounded-md text-main-500 font-bold hover:bg-main-700 hover:text-white cursor-pointer',
            isActive && 'bg-main-700 text-white',
          ),
        )}
      >
        {content}
      </div>
    )
  }
  return (
    <div className="w-10 h-10 flex items-end justify-center bg-main-50 rounded-md text-main-500 font-bold ">
      {content}
    </div>
  )
}

export default PaginationItem

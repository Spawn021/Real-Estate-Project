import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const SearchItem = ({ title, children, className }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'flex flex-col justify-center items-center gap-2 border-r px-4 relative ',
          className,
        ),
      )}
    >
      <h3 className="font-semibold text-main-700 ">{title}</h3>
      {children}
    </div>
  )
}

export default SearchItem

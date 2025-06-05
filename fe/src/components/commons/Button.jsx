import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CgSpinner } from 'react-icons/cg'

const Button = ({ children, className, onClick, type = 'button', isLoading = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        clsx(
          'py-3 px-4 text-white bg-main-700 rounded-md flex justify-center items-center gap-2',
          className,
          isLoading && 'opacity-50 ',
        ),
      )}
      disabled={isLoading}
    >
      {isLoading && <CgSpinner className="animate-spin" />}
      {children}
    </button>
  )
}

export default Button

import { NavLink, Link } from 'react-router-dom'
import Button from '../commons/Button'
import { navigations } from '@/utils/constants'
import clsx from 'clsx'
import withRouter from '@/hocs/withRouter'
import { twMerge } from 'tailwind-merge'
import { useUserStore } from '@/store/useUserStore'
import { useModalStore } from '@/store/useModalStore'
import Login from '../login/Login'

const Navigation = ({ location }) => {
  const { current } = useUserStore()
  const { setModal } = useModalStore()
  return (
    <div className="h-[85px] w-full bg-transparent z-10 fixed top-[85px] px-[100px] py-[26px] flex items-center justify-between ">
      <Link to="/">
        <img src="/logo.png" alt="Logo" className="w-[120px] object-content" />
      </Link>
      <div
        className={clsx(
          'flex items-center gap-6 text-gray-300 transition-colors duration-300',
          location.pathname !== '/' && 'text-gray-700',
        )}
      >
        {navigations.map((nav) => (
          <NavLink
            key={nav.id}
            to={nav.path}
            className={({ isActive }) =>
              twMerge(
                clsx(
                  isActive
                    ? 'text-white font-medium'
                    : 'hover:text-white hover:font-medium',
                  isActive && location.pathname !== '/' && 'text-gray-900',
                  location.pathname !== '/' && 'hover:text-gray-900',
                ),
              )
            }
          >
            {nav.text}
          </NavLink>
        ))}
        {current ? (
          <Button
            className={twMerge(
              clsx(location.pathname == '/' && 'bg-transparent border border-main-100'),
            )}
          >
            Add Listing
          </Button>
        ) : (
          <Button
            className={twMerge(
              clsx(location.pathname == '/' && 'bg-transparent border border-main-100'),
            )}
            onClick={() => setModal(true, <Login />)}
          >
            Sign in
          </Button>
        )}
      </div>
    </div>
  )
}
const NavigationWithRouter = withRouter(Navigation)
export default NavigationWithRouter

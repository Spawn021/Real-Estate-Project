import { CustomerSidebar, Login } from '@/components'
import withRouter from '@/hocs/withRouter'
import { useModalStore } from '@/store/useModalStore'
import { useUserStore } from '@/store/useUserStore'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Swal from 'sweetalert2'

const UserLayout = ({ navigate }) => {
  const { current } = useUserStore()
  const { setModal } = useModalStore()
  useEffect(() => {
    if (!current || !current?.userRoles.some((item) => item.roleCode === 'ROLE7')) {
      Swal.fire({
        title: 'Access Denied',
        text: 'You do not have permission to access this page.',
        icon: 'error',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Go Login',
        cancelButtonText: 'Go Home',
      }).then((result) => {
        if (result.isConfirmed) {
          setModal(true, <Login />)
        }
        if (result.isDismissed) {
          navigate('/')
        }
      })
    }
  }, [current, navigate, setModal])

  if (!current || !current?.userRoles.some((item) => item.roleCode === 'ROLE7')) {
    return null
  }
  return (
    <div className="grid grid-cols-12 ">
      <div className="col-span-2 bg-main-500 text-white h-full max-h-screen overflow-y-auto">
        <CustomerSidebar />
      </div>
      <div className="col-span-10">
        <Outlet />
      </div>
    </div>
  )
}
const UserLayoutWithRouter = withRouter(UserLayout)
export default UserLayoutWithRouter

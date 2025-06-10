import { AdminSidebar } from '@/components'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className="grid grid-cols-12 ">
      <div className="col-span-2 bg-main-500 text-white h-full max-h-screen overflow-y-auto">
        <AdminSidebar />
      </div>
      <div className="col-span-10">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout

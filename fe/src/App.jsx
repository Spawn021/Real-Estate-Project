import { Route, Routes } from 'react-router-dom'
import { AboutUs, Home, OurAgents, Properties, PublicLayout } from './pages/public'
import { path } from './utils/path'
import { Modal } from './components'
import { useModalStore } from './store/useModalStore'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUserStore } from './store/useUserStore'
import { useEffect } from 'react'
import {
  AdminLayout,
  CreatePropertyType,
  Dashboard,
  ManagePropertyType,
} from './pages/admin'
import { Personal, UserLayout } from './pages/user'
import { usePropertyStore } from './store/usePropertyStore'

function App() {
  const { isShowModal } = useModalStore()
  const { getCurrent, token, getRoles } = useUserStore()
  const { getPropertyTypes } = usePropertyStore()
  useEffect(() => {
    getCurrent()
    getRoles()
    getPropertyTypes({ fields: 'id,name,image' })
  }, [token])

  return (
    <>
      {isShowModal && <Modal />}
      <Routes>
        <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ABOUT_US} element={<AboutUs />} />
          <Route path={path.OUR_AGENTS} element={<OurAgents />} />
          <Route path={path.PROPERTIES} element={<Properties />} />
        </Route>

        <Route path={path.ADMIN_LAYOUT} element={<AdminLayout />}>
          <Route path={path.ADMIN_DASHBOARD} element={<Dashboard />} />
          <Route path={path.CREATE_PROPERTY_TYPE} element={<CreatePropertyType />} />
          <Route path={path.MANAGE_PROPERTY_TYPE} element={<ManagePropertyType />} />
        </Route>

        <Route path={path.USER_LAYOUT} element={<UserLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App

import { Outlet } from 'react-router-dom'

import { Modal } from './components'
import { useModalStore } from './store/useModalStore'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUserStore } from './store/useUserStore'
import { useEffect } from 'react'

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
      <Outlet />
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

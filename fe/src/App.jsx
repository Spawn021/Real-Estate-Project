import { Route, Routes } from 'react-router-dom'
import {
  AboutUs,
  Home,
  OurAgents,
  Properties,
  PublicLayout,
  Search,
} from './pages/public'
import { path } from './utils/path'
import { Modal } from './components'
import { useModalStore } from './store/useModalStore'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUserStore } from './store/useUserStore'
import { useEffect } from 'react'

function App() {
  const { isShowModal } = useModalStore()
  const { getCurrent, token } = useUserStore()

  useEffect(() => {
    getCurrent()
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
          <Route path={path.SEARCH} element={<Search />} />
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

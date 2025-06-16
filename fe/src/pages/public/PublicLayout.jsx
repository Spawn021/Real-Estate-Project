import React, { useEffect } from 'react'
import { Navigation, TopHeader } from '@/components'
import { Outlet } from 'react-router-dom'
import withRouter from '@/hocs/withRouter'
import clsx from 'clsx'
import { useModalStore } from '@/store/useModalStore'

const PublicLayout = ({ location }) => {
  const { isShowModal } = useModalStore()
  useEffect(() => {
    if (isShowModal) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => document.body.classList.remove('overflow-hidden')
  }, [isShowModal])
  return (
    <div>
      <TopHeader />
      <Navigation />
      <div className={clsx(location.pathname === '/' ? 'pt-0' : 'pt-[170px]')}>
        <Outlet />
      </div>
    </div>
  )
}
const PublicLayoutWithRouter = withRouter(PublicLayout)
export default PublicLayoutWithRouter

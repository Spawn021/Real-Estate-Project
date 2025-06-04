import React from 'react'
import { Navigation, TopHeader } from '@/components'
import { Outlet } from 'react-router-dom'
import withRouter from '@/hocs/withRouter'
import clsx from 'clsx'

const PublicLayout = ({ location }) => {
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

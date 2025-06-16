import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { Link } from 'react-router-dom'
import { path } from '@/utils/path'

const Breadcrumb = () => {
  const breadcrumbRoutes = [
    {
      path: '/',
      breadcrumb: 'Home',
    },
    {
      path: `/${path.PROPERTIES}`,
      breadcrumb: 'Properties',
    },
  ]

  const breadcrumbs = useBreadcrumbs(breadcrumbRoutes)
  return (
    <div>
      <nav className="flex items-center gap-2 text-gray-500 text-sm">
        {breadcrumbs.map(({ match, breadcrumb }, index) => (
          <Link
            to={match.pathname}
            key={index}
            className="flex items-center gap-2 hover:underline"
          >
            <span className="text-gray-400">{breadcrumb}</span>
            {index < breadcrumbs.length - 1 && <span className="text-gray-400">/</span>}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Breadcrumb

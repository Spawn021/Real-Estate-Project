import { createRoot } from 'react-dom/client'
import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './utils/routes'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)

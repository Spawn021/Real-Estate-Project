import { path } from './path'
import { MdDashboard } from 'react-icons/md'
import { FaHouse } from 'react-icons/fa6'
import { FaHouseChimneyMedical } from 'react-icons/fa6'
import { BsHouseGearFill } from 'react-icons/bs'

export const navigations = [
  {
    id: 1,
    path: '/',
    text: 'HOME',
  },
  {
    id: 2,
    path: `/${path.ABOUT_US}`,
    text: 'ABOUT US',
  },
  {
    id: 3,
    path: `/${path.OUR_AGENTS}`,
    text: 'OUR AGENTS',
  },
  {
    id: 4,
    path: `/${path.PROPERTIES}`,
    text: 'PROPERTIES',
  },
  {
    id: 5,
    path: `/${path.SEARCH}`,
    text: 'SEARCH',
  },
]

export const adminSidebar = [
  {
    id: 1,
    name: 'Dashboard',
    path: `/${path.ADMIN_LAYOUT}/${path.DASHBOARD}`,
    icon: <MdDashboard />,
    type: 'SINGLE',
  },
  {
    id: 2,
    name: 'Property Type',
    path: '',
    icon: <FaHouse />,
    type: 'PARENT',
    children: [
      {
        id: 21,
        name: 'Create',
        path: `/${path.ADMIN_LAYOUT}/${path.CREATE_PROPERTY_TYPE}`,
        type: 'SINGLE',
        icon: <FaHouseChimneyMedical />,
      },
      {
        id: 22,
        name: 'Manage',
        path: `/${path.ADMIN_LAYOUT}/${path.MANAGE_PROPERTY_TYPE}`,
        type: 'SINGLE',
        icon: <BsHouseGearFill />,
      },
    ],
  },
]
